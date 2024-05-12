import pool from "../config/db";

class Event {
  async getEvents() {
    try{
      const q = "SELECT * FROM event";
      const result = await pool.query(q);
      return result.rows;
    }catch(err){
      throw err
    }
  }

  async getEventById(id: string){
    try{
      const q = "SELECT * FROM event WHERE id = $1";
      const result = await pool.query(q, [id]);
      return result.rows;
    }catch(err){
      throw err
    }
  }

  async addEvent(id: string, title: string, date: string, uic: number) {
    try{
      const q = "INSERT INTO event (id, title, date, uic) VALUES ($1, $2, $3, $4) RETURNING *";
      const result = await pool.query(q, [id, title, date, uic]);
      return result.rows;
    }catch(err){
      throw err
    }
  }

  async editEvent(id: string, title: string, date: string, updateTime: string, uic: number) {
    try{
      const q = "UPDATE event SET title = $1, date = $2, uic = $3, updated_at = $4 WHERE id = $5 RETURNING *";
      const result = await pool.query(q, [title, date, uic, updateTime, id]);
      return result.rows;
    }catch(err){
      throw err
    }
  }

  async editEventStatus(id: string, updateTime: string) {
    try{
      const q = "UPDATE event SET status=$1, updated_at = $2, file = $3 WHERE id = $4 RETURNING *";
      const fileName = `attendance_${id}.pdf`;
      const result = await pool.query(q, [1, updateTime, fileName, id]);
      return result.rows;
    }catch(err){
      throw err
    }
  }

  async deleteEvent(id: string) {
    try{
      const q = "DELETE FROM event WHERE id = $1 RETURNING *";
      const result = await pool.query(q, [id]);
      return result.rows;
    }catch(err){
      throw err
    }
  }
}

const event = new Event();

export default event