import type { ITask } from "../utils/constants.";

//1. Описание действия по изменению значения данного сегмента глобального состояния
// а. Сохраняем название действия
// б. Прописываем ф-ции, которые возвращают объект с инф-ей о действии
// в. Типизация события (Action)
export const EDIT_TASK = "EDIT_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const CREATE_TASK = "CREATE_TASK";
export const FETCH_TASK = "FETCH_TASK";

export const editTask = (newTask: ITask): IAction => ({
  type: EDIT_TASK,
  payload: newTask,
});

export const deleteTask = (id: string): IAction => ({
  type: DELETE_TASK,
  payload: id,
});

export const createTask = (newTask: ITask): IAction => ({
  type: CREATE_TASK,
  payload: newTask,
});

export const fetchTask = (taskList: ITask[]): IAction => ({
  type: FETCH_TASK,
  payload: taskList,
});

export type IAction =
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
