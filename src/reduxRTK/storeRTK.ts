import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";

export const storeRTK = configureStore({
  reducer: {
    taskManager: taskReducer,
    userManager: userReducer,
    themeToggle: themeReducer,
  },
});

storeRTK.subscribe(() => {
  try {
    const state = storeRTK.getState();
    localStorage.setItem("tasks", JSON.stringify(state.taskManager.tasks));
    localStorage.setItem("users", JSON.stringify(state.userManager.users));
  } catch (err) {
    console.log(err);
  }
});

export type RootStateRTK = ReturnType<typeof storeRTK.getState>;
export type AppDispatchRTK = typeof storeRTK.dispatch;
