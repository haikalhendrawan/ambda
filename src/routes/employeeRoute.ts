import express from "express";
import { uploadExcel } from "../config/multer";
import * as employeeController from "../controller/employee.controller";

const router = express.Router();

router.post("/injectEmployee", uploadExcel, employeeController.injectEmployee);
router.get("/getAllEmployee", employeeController.getAllEmployee);
router.get("deleteAllEmployee", employeeController.deleteAllEmployee);


export default router