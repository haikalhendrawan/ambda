import pool from "../config/db";
import { PoolClient } from "pg";

interface EmpDataExcel{
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

interface EmpDataSql {
  No: number;
  NIPFormatBaru: string;
  NIP: string;
  NamaGelar: string;
  GelarDepan: string;
  Nama: string;
  GelarBelakang: string;
  NamaTerakhir: string;
  Sex: string;
  BMI: string;
  KetBMI: string;
  Pangkat: string;
  Gol: string;
  GolTMT: string;
  Eselon: string;
  EselonTMT: string;
  TMTJabatan: string;
  TempatLahir: string;
  TanggalLahir: string;
  Usia: number;
  PendidikanTerakhir: string;
  PendidikanTerakhirShrt: string;
  Agama: string;
  Jabatan: string;
  KodeUnit: string;
  UnitEselonII: string;
  UnitEselonIII: string;
  UnitEselonIV: string;
  UnitKerja: string;
  UnitSulitTrs: string;
  RemoteZone: string;
  Status: string;
  AktifYN: string;
  UnitPertama: string;
  MasaKerjaGolonganThn: number;
  MasaKerjaGolonganBln: number;
  MasaKerjaSeluruhnyaThn: number;
  MasaKerjaSeluruhnyaBln: number;
  HP: string;
  Email: string;
};


class Employee{
  async getEmployee(){
    try{
      const q = "SELECT * FROM employee";
      const result = await pool.query(q);
      return result.rows
    }catch(err){
      throw err
    }
  }

  async addEmployee(client: PoolClient, data: EmpDataExcel){
    try{
      const {
        No,
        ["NIP Format Baru"]: NIPFormatBaru,
        NIP,
        ["Nama Gelar"]: NamaGelar,
        ["Gelar Depan"]: GelarDepan,
        Nama,
        ["Gelar Belakang"]: GelarBelakang,
        ["Nama Terakhir"]: NamaTerakhir,
        Sex,
        BMI,
        ["Ket BMI"]: KetBMI,
        Pangkat,
        Gol,
        ["Gol TMT"]: GolTMT,
        Eselon,
        ["Eselon TMT"]: EselonTMT,
        ["TMT Jabatan"]: TMTJabatan,
        ["Tempat Lahir"]: TempatLahir,
        ["Tanggal Lahir"]: TanggalLahir,
        ["Usia (th.)"]: Usia,
        ["Pendidikan Terakhir"]: PendidikanTerakhir,
        ["Pendidikan Terakhir (Short)"]: PendidikanTerakhirShrt,
        Agama,
        Jabatan,
        ["Kode Unit"]: KodeUnit,
        ["Unit Eselon II"]: UnitEselonII,
        ["Unit Eselon III"]: UnitEselonIII,
        ["Unit Eselon IV"]: UnitEselonIV,
        ["Unit Kerja"]: UnitKerja,
        ["Unit Sulit Trs"]: UnitSulitTrs,
        ["Remote Zone"]: RemoteZone,
        Status,
        ["Aktif Y/N"]: AktifYN,
        ["Unit Pertama"]: UnitPertama,
        ["Masa kerja golongan Thn"]: MasaKerjaGolonganThn,
        ["Masa kerja golongan Bln"]: MasaKerjaGolonganBln,
        ["Masa kerja seluruhnya Thn"]: MasaKerjaSeluruhnyaThn,
        ["Masa kerja seluruhnya Bln"]: MasaKerjaSeluruhnyaBln,
        HP,
        Email
      } = data;
      const q = `INSERT INTO employee
                  (
                    "No", 
                    "NIPFormatBaru", 
                    "NIP", 
                    "NamaGelar", 
                    "GelarDepan", 
                    "Nama", 
                    "GelarBelakang", 
                    "NamaTerakhir", 
                    "Sex", 
                    "BMI",
                    "KetBMI", 
                    "Pangkat", 
                    "Gol", 
                    "GolTMT", 
                    "Eselon", 
                    "EselonTMT", 
                    "TMTJabatan",
                    "TempatLahir", 
                    "TanggalLahir", 
                    "Usia", 
                    "PendidikanTerakhir", 
                    "PendidikanTerakhirShrt", 
                    "Agama", 
                    "Jabatan", 
                    "KodeUnit", 
                    "UnitEselonII", 
                    "UnitEselonIII", 
                    "UnitEselonIV", 
                    "UnitKerja", 
                    "UnitSulitTrs", 
                    "RemoteZone", 
                    "Status", 
                    "Aktif", 
                    "UnitPertama", 
                    "MasaKerjaGolThn", 
                    "MasaKerjaGolBln", 
                    "MasaKerjaSeluruhnyaThn", 
                    "MasaKerjaSeluruhnyaBln", 
                    "HP", 
                    "Email"
                  )
                  VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31,$32,$33,$34,$35,$36,$37,$38,$39,$40) 
                  RETURNING *`;
      const values = [
        No, 
        NIPFormatBaru, 
        NIP, 
        NamaGelar, 
        GelarDepan, 
        Nama, 
        GelarBelakang, 
        NamaTerakhir, 
        Sex, 
        BMI, 
        KetBMI, 
        Pangkat, 
        Gol, 
        GolTMT, 
        Eselon, 
        EselonTMT, 
        TMTJabatan, 
        TempatLahir, 
        TanggalLahir, 
        Usia, 
        PendidikanTerakhir, 
        PendidikanTerakhirShrt, 
        Agama, 
        Jabatan, 
        KodeUnit, 
        UnitEselonII, 
        UnitEselonIII, 
        UnitEselonIV, 
        UnitKerja, 
        UnitSulitTrs, 
        RemoteZone, 
        Status, 
        AktifYN, 
        UnitPertama, 
        MasaKerjaGolonganThn, 
        MasaKerjaGolonganBln, 
        MasaKerjaSeluruhnyaThn, 
        MasaKerjaSeluruhnyaBln, 
        HP, 
        Email
      ];

      const result = await client.query(q, values);
      return result.rows[0]
    }catch(err){
      throw err
    }
  }

  async deleteAllEmployee(client: PoolClient) {
    try{
      const q = `DELETE FROM employee WHERE "No" IS NOT NULL RETURNING *`;
      const result = await client.query(q);
      return result.rows[0]
    }catch(err){
      throw err
    }
  }
}

const employee = new Employee();

export default employee