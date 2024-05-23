import {Request, Response, NextFunction} from 'express';
import event from "../model/event.model";
import attendance from '../model/attendance.model';
import {v4 as uuidv4} from "uuid";
import dayjs from 'dayjs';
import timezone from "dayjs/plugin/timezone";
import GeneratePDF from '../views/Generate';
import QRCode from 'qrcode';
import Jimp from 'jimp';
import path from 'path';
import fs from 'fs';
import {createCanvas, loadImage} from 'canvas';

dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Jakarta');


const getAllEvent = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await event.getEvents();
    res.status(200).json({sucess: true, message: 'Get Event Success', rows: result});
  }catch(err) {
    next(err);
  }
}

const getTodayEvent = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await event.getEvents();
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split("T")[0];
    const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];
    const todayEvents = result.filter((item) => 
      (dayjs(item.date).format('YYYY-MM-DD') === today
      || dayjs(item.date).format('YYYY-MM-DD') === yesterday
      || dayjs(item.date).format('YYYY-MM-DD') === tomorrow) 
      && item.status!==1
    );
    res.status(200).json({sucess: true, message: 'Get Event Success', rows: todayEvents});
  }catch(err) {
    next(err);
  }
}

const addEvent = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const id = uuidv4();
    const {title, date, uic} = req.body;
    console.log(id, title, date, uic);
    const result = await event.addEvent(id, title, date, uic);
    res.status(200).json({sucess: true, message: 'Add Event Success', rows: result});
  }catch(err) {
    next(err);
  }
}

const editEvent = async(req: Request, res: Response, next: NextFunction) => {
  try{
    const {id, title, date, uic} = req.body;
    const updateTime = new Date(Date.now()).toISOString();
    const result = await event.editEvent(id, title, date, updateTime, uic);
    res.status(200).json({sucess: true, message: 'Edit Event Success', rows: result}); 
  }catch(err){
    next(err);
  }
}

const closeEvent = async(req: Request, res: Response, next: NextFunction) => {
  try{
    const {id} = req.body;
    const rows = await attendance.getAttendanceByEvent(id);
    const targetEvent = await event.getEventById(id);

    const url =`${process.env.API_URL}/attendance/attendance_${id}.pdf`;
    const logoPath = path.resolve(__dirname+`/../uploads/logo/ambo_logo.png` );
    const outputPath = path.resolve(__dirname+`/../uploads/qr/qr_${id}.png` );

    // await generateQRCodeWithLogo(url, logoPath, outputPath);
    await generateCanvasQrCode(url, logoPath, 300, 60, outputPath);
    await GeneratePDF(rows, id, targetEvent);  
    const updateTime = new Date(Date.now()).toISOString();
    const result = await event.editEventStatus(id, updateTime);
    res.status(200).json({sucess: true, message: 'Event Closed', rows: result}); 
  }catch(err){
    next(err);
    console.log(err)
  }
}

const deleteEvent = async(req: Request, res: Response, next: NextFunction) => {
  try{
    const {id} = req.body;
    const result = await event.deleteEvent(id);
    res.status(200).json({sucess: true, message: 'Delete Event Success', rows: result}); 
  }catch(err){
    next(err);
  }
}


export {getAllEvent, getTodayEvent, addEvent, editEvent, closeEvent, deleteEvent}


//---------------------------------------------------------------------------------------
async function generateQRCodeWithLogo(text: string, logoPath: string, outputPath: string) {
  try {
      const qrCodeDataUrl = await QRCode.toDataURL(text);

      const logo = await Jimp.read(logoPath);

      const qrCode = await Jimp.read(Buffer.from(qrCodeDataUrl.split(',')[1], 'base64'));

      logo.resize(qrCode.bitmap.width / 4, Jimp.AUTO);

      const x = (qrCode.bitmap.width - logo.bitmap.width) / 2;
      const y = (qrCode.bitmap.height - logo.bitmap.height) / 2;

      qrCode.composite(logo, x, y);

      await qrCode.writeAsync(outputPath);

      console.log('QR code with logo generated:', outputPath);
  } catch (err) {
      console.error('Error:', err);
  }
};


async function generateCanvasQrCode(dataForQRcode: string, center_image: string, width: number, cwidth: number, outputPath: string) {
  const canvas = createCanvas(width, width);
  await QRCode.toCanvas(
    canvas,
    dataForQRcode,
    {
      errorCorrectionLevel: "H",
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    }
  );

  const ctx = canvas.getContext("2d");
  const img = await loadImage(center_image);
  const center = (width - cwidth - cwidth - 30) / 2;
  ctx.drawImage(img, center, center, cwidth, cwidth);
  const base64Image = canvas.toDataURL("image/png");
  const base64Data = base64Image.replace(/^data:image\/png;base64,/, "");
  fs.writeFileSync(outputPath, base64Data, 'base64');

  console.log(`QR code with logo saved to: ${outputPath}`);
};