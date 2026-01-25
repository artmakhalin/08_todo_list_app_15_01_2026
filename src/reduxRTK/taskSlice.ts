import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadFromLocalStorage, type ITask } from "../utils/constants";

interface IState {
  tasks: ITask[];
}

const initialState: IState = {
  tasks: loadFromLocalStorage<ITask>("tasks"),
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    createTask(state, action: PayloadAction<ITask>) {
      state.tasks = [action.payload, ...state.tasks];
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((e) => e.id !== action.payload);
    },
    editTask(state, action: PayloadAction<ITask>) {
      state.tasks = state.tasks.map((e) =>
        e.id === action.payload.id ? action.payload : e,
      );
    },
    fetchTask(state, action: PayloadAction<ITask[]>) {
      state.tasks = action.payload;
    },
  },
});

export const { createTask, deleteTask, editTask, fetchTask } =
  taskSlice.actions;

export default taskSlice.reducer;
