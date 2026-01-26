import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { loadFromLocalStorage, type ITask } from "../utils/constants";

interface IState {
  tasks: ITask[];
  loadingTask: boolean;
  errorTask: string;
}

const initialState: IState = {
  tasks: loadFromLocalStorage<ITask>("tasks"),
  loadingTask: false,
  errorTask: "",
};

export const fetchTaskRTK = createAsyncThunk<ITask[]>(
  "task/fetchTask",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
      );
      if (!res.ok) {
        throw new Error("Error when fetch tasks");
      }
      const data = (await res.json()) as Omit<ITask, "createdAt">[];
      return data.map((t) => ({
        ...t,
        createdAt: new Date(2026, 0, 1, 0, 0, 0).toISOString(),
      }));
    } catch {
      return thunkAPI.rejectWithValue("Network errorTask while fetching tasks");
    }
  },
);

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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTaskRTK.pending, (state) => {
        state.loadingTask = true;
        state.errorTask = "";
      })
      .addCase(fetchTaskRTK.fulfilled, (state, action) => {
        state.loadingTask = false;
        state.errorTask = "";
        state.tasks = action.payload;
      })
      .addCase(fetchTaskRTK.rejected, (state, action) => {
        state.loadingTask = false;
        state.errorTask = (action.payload as string) || "Error";
      });
  },
});

export const { createTask, deleteTask, editTask } = taskSlice.actions;

export default taskSlice.reducer;
