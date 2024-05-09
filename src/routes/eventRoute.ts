import express from "express";
import * as eventController from "../controller/event.controller";

const router = express.Router();

router.get("/getAllEvent", eventController.getAllEvent);
router.post("/addEvent", eventController.addEvent);
router.post("/editEvent", eventController.editEvent);
router.post("/closeEvent", eventController.closeEvent);


export default router