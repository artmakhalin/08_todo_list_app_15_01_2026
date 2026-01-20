import type { ITask } from "../utils/constants.";

export const EDIT_TASK = "EDIT_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const CREATE_TASK = "CREATE_TASK";

export const editTask = (newTask: ITask) => ({
  type: EDIT_TASK,
  payload: newTask,
});

export const deleteTask = (id: string) => ({
  type: DELETE_TASK,
  payload: id,
});

export const createTask = (newTask: ITask) => ({
  type: CREATE_TASK,
  payload: newTask,
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
    };
