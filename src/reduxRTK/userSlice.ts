import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage, type IUser } from "../utils/constants";

interface IState {
  users: IUser[];
}

const initialState: IState = {
  users: loadFromLocalStorage<IUser>("users"),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser(state, action: PayloadAction<IUser>) {
      state.users = [action.payload, ...state.users];
    },
    deleteUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter((e) => e.id !== action.payload);
    },
    editUser(state, action: PayloadAction<IUser>) {
      state.users = state.users.map((e) =>
        e.id === action.payload.id ? action.payload : e,
      );
    },
    fetchUser(state, action: PayloadAction<IUser[]>) {
      state.users = action.payload;
    },
  },
});

export const { createUser, deleteUser, editUser, fetchUser } =
  userSlice.actions;

export default userSlice.reducer;
