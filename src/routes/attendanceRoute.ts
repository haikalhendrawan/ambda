import express from "express";
import * as attendanceController from "../controller/attendance.controller";

const router = express.Router();

router.post("/getAttendanceByEvent", attendanceController.getAttendanceByEvent);
router.post("/addAttendance", attendanceController.addAttendance);


export default router