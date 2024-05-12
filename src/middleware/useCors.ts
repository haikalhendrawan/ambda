import cors from "cors";
import "dotenv/config";
import { Request, Response, NextFunction } from 'express';
import logger from "../config/logger";

const whitelist = [process.env.CLIENT_URL, process.env.CLIENT_URL2, process.env.CLIENT_URL3]

var corsOptions = {
  origin: function(origin: any, callback: any) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

export default function useCors() {
  return cors(corsOptions)
};