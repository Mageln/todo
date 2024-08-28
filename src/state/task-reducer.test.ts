import { expect, test } from "vitest";
import {
  AddTaskAC,
  changeTasksObjStatusAC,
  RemoveTaskAC,
  taskReducer,
  changeTaskTitleAC,
} from "./task-reducer";
import { tasksObjStateType } from "../AppWithRedux.tsx";
import { AddTodolistAC, } from "./todolist-reducer";

test("correct task should be added", () => {
  const startState: tasksObjStateType = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        isDone: true,
      },
      {
        id: "2",
        title: "JavaScript",
        isDone: true,
      },
      {
        id: "3",
        title: "React",
        isDone: false,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "Book",
        isDone: true,
      },
      {
        id: "2",
        title: "Milk",
        isDone: true,
      },
      { id: "3", title: "ICE", isDone: false },
    ],
  };
  const action = AddTaskAC("juce", "todolistId2");

  const endState = taskReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4); // ВАЖНО: ТЕСТ ДОЛЖЕН ПРОВЕРЯТЬ КОРРЕКТНЫЕ ДАННЫЕ
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].isDone).toBe(false);
});

test("correct task should be removed", () => {
  const startState: tasksObjStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "JavaScript", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "Book", isDone: true },
      { id: "2", title: "Milk", isDone: true },
    ],
  };

  const endState = taskReducer(startState, RemoveTaskAC("2", "todolistId2"));

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(1);
  expect(endState["todolistId2"].every((t) => t.id != "2")).toBeTruthy();
});

test("status of specified task should be change", () => {
  const startState: tasksObjStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "JavaScript", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "Book", isDone: true },
      { id: "2", title: "Milk", isDone: true },
    ],
  };

  const action = changeTasksObjStatusAC("2", false, "todolistId2");

  const endState = taskReducer(startState, action);

  expect(endState["todolistId2"][1].isDone).toBeFalsy();
  expect(endState["todolistId1"][1].isDone).toBeTruthy();
});

test("title of specified task should be change", () => {
  const startState: tasksObjStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "JavaScript", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "Book", isDone: true },
      { id: "2", title: "Milk", isDone: true },
    ],
  };

  const action = changeTaskTitleAC("2", "ICE", "todolistId2");

  const endState = taskReducer(startState, action);

  expect(endState["todolistId2"][1].title).toBe("ICE");
  expect(endState["todolistId1"][1].title).toBe("JavaScript");
});

test("new property with array should be added when new todolist is added", () => {
  const startState: tasksObjStateType = {
    todolistId1: [
      { id: "1", title: "CSS", isDone: true },
      { id: "2", title: "JavaScript", isDone: true },
      { id: "3", title: "React", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "Book", isDone: true },
      { id: "2", title: "Milk", isDone: true },
      { id: "3", title: "tea", isDone: false },
    ],
  };

  const action = AddTodolistAC("new todolist");

  const endState = taskReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});
