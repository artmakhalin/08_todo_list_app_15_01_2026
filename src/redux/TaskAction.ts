import type { ITask } from "../utils/constants";

//1. Описание действия по изменению значения данного сегмента глобального состояния
// а. Сохраняем название действия
// б. Прописываем ф-ции, которые возвращают объект с инф-ей о действии
// в. Типизация события (Action)
export const EDIT_TASK = "EDIT_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const CREATE_TASK = "CREATE_TASK";
export const FETCH_TASK = "FETCH_TASK";

export const editTask = (newTask: ITask): ITaskAction => ({
  type: EDIT_TASK,
  payload: newTask,
});

export const deleteTask = (id: string): ITaskAction => ({
  type: DELETE_TASK,
  payload: id,
});

export const createTask = (newTask: ITask): ITaskAction => ({
  type: CREATE_TASK,
  payload: newTask,
});

export const fetchTask = (taskList: ITask[]): ITaskAction => ({
  type: FETCH_TASK,
  payload: taskList,
});

export type ITaskAction =
  | {
      type: "EDIT_TASK";
      payload: ITask;
    }
  | {
      type: "DELETE_TASK";
      payload: string;
    }
  | {
      type: "CREATE_TASK";
      payload: ITask;
    }
  | {
      type: "FETCH_TASK";
      payload: ITask[];
    };
