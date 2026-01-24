export interface ITask {
  userId: number;
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export type SortTaskMode =
  | "default"
  | "completed"
  | "uncompleted"
  | "fresh"
  | "old";

export type SortUserMode = "default" | "nameAsc" | "nameDesc";

export type ThemeType = "light" | "dark";

export function loadFromLocalStorage<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}
