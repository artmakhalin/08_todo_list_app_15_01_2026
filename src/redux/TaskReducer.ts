import { loadFromLocalStorage, type ITask } from "../utils/constants";
import type { ITaskAction } from "./taskAction";

//2. Работа с ф-цией reducer 
//а. Создать и типизировать данный сегмент глобального состояния
//б. Описание ф-ции регулировщика, которая в зависимости от актуального значения state и 
// действия (action), которое нужно совершить с глобальным состоянием, возвращает новое значение 
// глобального состояния

interface IState {
  tasks: ITask[];
}

const initialState: IState = {
  tasks: loadFromLocalStorage<ITask>("tasks"),
};

export default function taskReducer(state = initialState, action: ITaskAction) {
  switch (action.type) {
    case "CREATE_TASK":
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((e) => e.id !== action.payload),
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map((e) =>
            e.id === action.payload.id ? action.payload : e,
          ),
      };
    case "FETCH_TASK":
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
}
