import {Request, Response, NextFunction} from 'express';
import pool from "../config/db";
import xlsx from "xlsx";
import * as fs from "fs";
import path from "path";
import employee from "../model/employee.model";
import multer from 'multer';

interface EmpData{
  "No": number,
  "NIP Format Baru": string,
  "NIP": string,
  "Nama Gelar": string,
  "Gelar Depan": string,
  "Nama": string,
  "Gelar Belakang": string,
  "Nama Terakhir": string,
  "Sex": string,
  "BMI": string,
  "Ket BMI": string,
  "Pangkat": string,
  "Gol": string,
  "Gol TMT": string,
  "Eselon": string,
  "Eselon TMT": string,
  "TMT Jabatan": string,
  "Tempat Lahir": string,
  "Tanggal Lahir": string,
  "Usia (th.)": number,
  "Pendidikan Terakhir": string,
  "Pendidikan Terakhir (Short)": string,
  "Agama": string,
  "Jabatan": string,
  "Kode Unit": string,
  "Unit Eselon II": string,
  "Unit Eselon III": string,
  "Unit Eselon IV": string,
  "Unit Kerja": string,
  "Unit Sulit Trs": string,
  "Remote Zone": string,
  "Status": string,
  "Aktif Y/N": string,
  "Unit Pertama": string,
  "Masa kerja golongan Thn": number,
  "Masa kerja golongan Bln": number,
  "Masa kerja seluruhnya Thn": number,
  "Masa kerja seluruhnya Bln": number,
  "HP": string,
  "Email": string
};


const getAllEmployee = async(req: Request, res: Response, next: NextFunction) => {
  try{
    const rows = await employee.getEmployee();
    res.status(200).json({sucess: true, message: 'Get All Employee success', rows: rows});
  }catch(err){
    next(err);
  }
};

const injectEmployee = async(req: Request, res: Response, next: NextFunction) => {
  const client= await pool.connect();
  try{
    if(!req.file){
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    };

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const jsonXl: EmpData[] = xlsx.utils.sheet_to_json(workbook.Sheets.Sheet1, {defval: null});

    if (!jsonXl.every(validateEmpData)) {
      return res.status(400).json({ success: false, message: 'Invalid file format' });
    };

    await client.query("BEGIN");
    await employee.deleteAllEmployee(client);

    let result = jsonXl.map((item: EmpData) => {
      employee.addEmployee(client, item);
    });

    await client.query("COMMIT");

    res.status(200).json({sucess: true, message: 'Add employee success', rows: result});
  }catch(err){
    await client.query("ROLLBACK");
    next(err);
  }finally{
    client.release();
  }
};

const deleteAllEmployee = async(req: Request, res: Response, next: NextFunction) => {
  const client= await pool.connect();
  try{
    const result = await employee.deleteAllEmployee(client);
    res.status(200).json({sucess: true, message: 'Delete All Employee success', rows: result});
  }catch(err){
    next(err);
  }finally{
    client.release();
  }
};


export {getAllEmployee, injectEmployee, deleteAllEmployee}


// --------------------------------------------------------------------------------------------------------
function validateEmpData (data: any): data is EmpData {
  const requiredFields: (keyof EmpData)[] = [
    "No", "NIP Format Baru", "NIP", "Nama Gelar", "Gelar Depan", "Nama", "Gelar Belakang",
    "Nama Terakhir", "Sex", "BMI", "Ket BMI", "Pangkat", "Gol", "Gol TMT", "Eselon",
    "Eselon TMT", "TMT Jabatan", "Tempat Lahir", "Tanggal Lahir", "Usia (th.)",
    "Pendidikan Terakhir", "Pendidikan Terakhir (Short)", "Agama", "Jabatan", "Kode Unit",
    "Unit Eselon II", "Unit Eselon III", "Unit Eselon IV", "Unit Kerja", "Unit Sulit Trs",
    "Remote Zone", "Status", "Aktif Y/N", "Unit Pertama", "Masa kerja golongan Thn",
    "Masa kerja golongan Bln", "Masa kerja seluruhnya Thn", "Masa kerja seluruhnya Bln",
    "HP", "Email"
  ];

  return requiredFields.every(field => field in data);
};