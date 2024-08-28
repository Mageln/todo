import { tasksObjStateType, TodolistType } from "../AppWithRedux.tsx"
import { taskReducer } from "./task-reducer";
import { AddTodolistAC, todolistReducer } from "./todolist-reducer";
import { expect, test } from "vitest";

test("ids should be equals", () => {
    const starttasksObjState: tasksObjStateType = {};
    const startTodolistsState: Array<TodolistType> = [];
    const action = AddTodolistAC("new Todolist");

    const endtasksObjtate = taskReducer(starttasksObjState,action)
    const endTodolistState = todolistReducer(startTodolistsState,action)

    const keys = Object.keys(endtasksObjtate);
    const idFromtasksObj = keys[0];
    const idFromTodolist = endTodolistState[0].id;

    expect(idFromtasksObj).toBe(action.todolistId);
    expect(idFromTodolist).toBe(action.todolistId)
})