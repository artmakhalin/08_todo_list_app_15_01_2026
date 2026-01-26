import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { loadFromLocalStorage, type IUser } from "../utils/constants";

interface IState {
  users: IUser[];
  loadingUser: boolean;
  errorUser: string;
}

const initialState: IState = {
  users: loadFromLocalStorage<IUser>("users"),
  loadingUser: false,
  errorUser: "",
};

export const fetchUserRTK = createAsyncThunk<IUser[]>(
  "user/fetchUser",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!res.ok) {
        throw new Error("Error when fetch users");
      }
      const data = (await res.json()) as IUser[];
      return data;
    } catch {
      return thunkAPI.rejectWithValue("Network errorUser while fetching users");
    }
  },
);

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
  extraReducers(builder) {
    builder
      .addCase(fetchUserRTK.pending, (state) => {
        state.loadingUser = true;
        state.errorUser = "";
      })
      .addCase(fetchUserRTK.fulfilled, (state, action) => {
        state.loadingUser = false;
        state.errorUser = "";
        state.users = action.payload;
      })
      .addCase(fetchUserRTK.rejected, (state, action) => {
        state.loadingUser = false;
        state.errorUser = (action.payload as string) || "Error";
      });
  },
});

export const { createUser, deleteUser, editUser, fetchUser } =
  userSlice.actions;

export default userSlice.reducer;
