import type { ITask } from "../utils/constants.";
import type { IAction } from "./TaskAction";

interface IState {
  tasks: ITask[];
}

const initialState: IState = {
  tasks: [],
};

export function taskReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case "CREATE_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: [...state.tasks.filter((e) => e.id !== action.payload)],
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: [
          ...state.tasks.map((e) =>
            e.id === action.payload.id ? action.payload : e,
          ),
        ],
      };
    default:
      break;
  }
}
