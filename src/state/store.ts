
import { taskReducer } from "./task-reducer";
import { combineReducers, configureStore,  } from "@reduxjs/toolkit";
import { todolistReducer } from "./todolist-reducer";


const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks:taskReducer
})

export type AppRootState = ReturnType<typeof rootReducer>
export const store =configureStore ({
    reducer: rootReducer
});
