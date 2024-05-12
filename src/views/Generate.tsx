import AttendanceReport from '../views/AttendanceReport';
import ReactPDF from '@react-pdf/renderer';
import {AttendanceEventBody, TargetEventType} from '../views/types';

export default async function GeneratePDF(attendance: AttendanceEventBody[], id: string, targetEvent: TargetEventType[]) {
  try{
    ReactPDF.render(
    <AttendanceReport attendance={attendance} event={targetEvent}/>, 
    `${__dirname}/../uploads/attendance/attendance_${id}.pdf`);
  }catch(err){
    console.log(`the image id is${targetEvent[0].id}`)
    console.log(`error generating image`)
    throw err
  }
}

