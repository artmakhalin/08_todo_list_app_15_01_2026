export interface ITask {
  userId: number;
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface IUser {
    id: string,
    name: string, 
    email: string,
    phone: string
}

export type SortMode =
  | "default"
  | "completed"
  | "uncompleted"
  | "fresh"
  | "old";