import {Request, Response, NextFunction} from 'express';
import event from "../model/event.model";
import {v4 as uuidv4} from "uuid";


const getAllEvent = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await event.getEvents();
    res.status(200).json({sucess: true, message: 'Get Event', rows: result});
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
    const result = await event.editEventStatus(id);
    res.status(200).json({sucess: true, message: 'Event Closed', rows: result}); 
  }catch(err){
    next(err);
  }
}


export {getAllEvent, addEvent, editEvent, closeEvent}