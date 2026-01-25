import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ThemeType } from "../utils/constants";

interface IState {
  theme: ThemeType;
}

const initialState: IState = {
  theme: "light",
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<ThemeType>) {
            state.theme = action.payload === "dark" ? "light" : "dark";
        }
    }
})

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;