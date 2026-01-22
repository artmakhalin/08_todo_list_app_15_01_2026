import type { IUser } from "../utils/constants.";

export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";
export const CREATE_USER = "CREATE_USER";
export const FETCH_USER = "FETCH_USER";

export const editUser = (newUser: IUser): IUserAction => ({
  type: EDIT_USER,
  payload: newUser,
});

export const deleteUser = (id: string): IUserAction => ({
  type: DELETE_USER,
  payload: id,
});

export const createUser = (newUser: IUser): IUserAction => ({
  type: CREATE_USER,
  payload: newUser,
});

export const fetchUser = (userList: IUser[]): IUserAction => ({
  type: FETCH_USER,
  payload: userList,
});

export type IUserAction =
  | { type: "EDIT_USER"; payload: IUser }
  | { type: "DELETE_USER"; payload: string }
  | { type: "CREATE_USER"; payload: IUser }
  | { type: "FETCH_USER"; payload: IUser[] };
