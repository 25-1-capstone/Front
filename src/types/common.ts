export interface ICategory {
  id: string;
  name: string;
  time?: string;
  totalTime?: string;
  percentage?: number;
}

export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
  categoryId?: string;
}

export interface IStudyGroup {
  id: string;
  name: string;
  description?: string;
  memberCount: number;
  todayStudyTime: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  studyDays: number;
  totalStudyTime: string;
}

export interface IStudySession {
  id: string;
  categoryId: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
}

export enum StudyStatus {
  IDLE = "IDLE",
  STUDYING = "STUDYING",
  PAUSED = "PAUSED",
}

export type Period = "day" | "week" | "month";
