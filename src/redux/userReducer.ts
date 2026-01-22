import { loadFromLocalStorage, type IUser } from "../utils/constants.";
import type { IUserAction } from "./userActions";

interface IState {
  users: IUser[];
}

const initialState: IState = {
  users: loadFromLocalStorage("users"),
};

export default function userReducer(state = initialState, action: IUserAction) {
  switch (action.type) {
    case "CREATE_USER":
      return { ...state, users: [action.payload, ...state.users] };
    case "DELETE_USER":
      return {
        ...state,
        users: [...state.users.filter((e) => e.id !== action.payload)],
      };
    case "EDIT_USER":
      return {
        ...state,
        users: [
          ...state.users.map((e) =>
            e.id === action.payload.id ? action.payload : e,
          ),
        ],
      };
    case "FETCH_USER":
      return {
        ...state,
        users: [...action.payload],
      };
    default:
      return state;
  }
}
