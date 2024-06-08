import express from "express";
import * as employeeController from "../controller/employee.controller";

const router = express.Router();

router.get("/injectEmployee", employeeController.injectEmployee);
router.get("/getAllEmployee", employeeController.getAllEmployee);
router.get("deleteAllEmployee", employeeController.deleteAllEmployee);


export default router