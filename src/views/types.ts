export interface AttendanceEventBody{
  id: string,
  name: string,
  email: string,
  event_id: string,
  identifier: string,
  submitted_at: string,
  unit: string,
  title: string,
  date: string,
  updated_at: string
};

export interface TargetEventType{
  id: string,
  title: string,
  date: string,
  uic: number,
  created_at: string,
  updated_at: string | null,
  status: number,
  file: string | null
}