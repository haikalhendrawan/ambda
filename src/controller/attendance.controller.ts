import {Request, Response, NextFunction} from 'express';
import attendance from "../model/attendance.model";


const getAttendanceByEvent = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const {eventId} = req.body;
    const result = await attendance.getAttendanceByEvent(eventId);
    res.status(200).json({sucess: true, message: 'Get Attendance success', rows: result});
  }catch(err) {
    next(err);
  }
}

const addAttendance = async(req: Request, res: Response, next: NextFunction) => {
  try{
    const {id, name, email, identifier, unit} = req.body;
    const result = await attendance.addAttendace(id, name, email, identifier, unit);
    res.status(200).json({sucess: true, message: 'Add Attendance success', rows: result});
  }catch(err){
    next(err);
  }
}

export {getAttendanceByEvent, addAttendance}
