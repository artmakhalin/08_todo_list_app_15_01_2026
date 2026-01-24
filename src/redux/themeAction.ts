import type { ThemeType } from "../utils/constants";

export const SET_THEME = "SET_THEME";

export const setTheme = (newTheme: ThemeType): IThemeAction => ({
  type: SET_THEME,
  payload: newTheme,
});

export interface IThemeAction {
  type: "SET_THEME";
  payload: ThemeType;
}
