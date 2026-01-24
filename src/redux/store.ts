import { combineReducers, legacy_createStore } from "redux";
import taskReducer from "./taskReducer";
import userReducer from "./userReducer";
import themeReducer from "./themeReducer";

export const store = legacy_createStore(
  combineReducers({
    taskManager: taskReducer,
    //3. Добавление нового сегмента глобального состояния вместе с reducer, который обработает любые изменения
    // в данном сегменте глобального состояния
    userManager: userReducer,
    themeToggle: themeReducer
  }),
);

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("tasks", JSON.stringify(state.taskManager.tasks));
  localStorage.setItem("users", JSON.stringify(state.userManager.users));
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
