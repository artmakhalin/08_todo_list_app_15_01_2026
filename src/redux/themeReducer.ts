import type { ThemeType } from "../utils/constants";
import type { IThemeAction } from "./themeAction";

interface IState {
  theme: ThemeType;
}

const initialState: IState = {
  theme: "light",
};

export default function themeReducer(
  state = initialState,
  action: IThemeAction,
): IState {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}
