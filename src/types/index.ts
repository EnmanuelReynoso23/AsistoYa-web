export interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  avatar: string;
  attendance: {
    present: number;
    absent: number;
    late: number;
  };
  streak: number;
}

export interface Notification {
  id: string;
  studentId: string;
  studentName: string;
  type: 'arrival' | 'departure' | 'absence' | 'alert';
  message: string;
  timestamp: Date;
  read: boolean;
}

export interface School {
  id: string;
  name: string;
  location: string;
  totalStudents: number;
  attendanceToday: number;
  absentToday: number;
}

export interface AttendanceSummary {
  date: string;
  presentPercentage: number;
  absentPercentage: number;
  latePercentage: number;
}