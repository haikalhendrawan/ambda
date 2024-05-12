import pool from "../config/db";

class Attendance {
  async getAttendanceByEvent(eventId: string) {
    try{
      const q = ` SELECT attendance.*, event.title, event.date, event.updated_at 
                  FROM attendance
                  LEFT JOIN event ON attendance.event_id = event.id 
                  WHERE event_id = $1`;
      const result = await pool.query(q, [eventId]);
      return result.rows;
    }catch(err){
      throw err
    }
  }

  async addAttendace(eventId: string, name: string, email: string, identifier: string, unit: string) {
    try{
      const q = ` INSERT INTO attendance (event_id, name, email, identifier, unit) 
                  VALUES ($1, $2, $3, $4, $5) 
                  RETURNING *`;
      const result = await pool.query(q,[eventId, name, email, identifier, unit]);
      return result.rows;
    }catch(err){
      throw err
    }
  }
}

const attendance = new Attendance();

export default attendance