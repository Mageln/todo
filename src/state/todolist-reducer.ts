/* eslint-disable no-case-declarations */
import { filterValuesType, TodolistType } from "../AppWithRedux";
import { v1 } from "uuid";

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todolistId: string;
};

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: filterValuesType;
};

export type ReorderTodolistsActionType = {
  type: "REORDER-TODOLIST";
  payload: { newOrder: any };
};

export type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | AddTaskActionType
  | ReorderTodolistsActionType;

const initialState: Array<TodolistType> = [];

export type AddTaskActionType = {
  type: "ADD-TASK";
  id: string;
  title: string;
};
export const todolistReducer = (
  state: Array<TodolistType> = initialState,
  action: ActionsType
) => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id != action.id);
    }
    case "ADD-TODOLIST": {
      return [
        {
          id: action.todolistId,
          title: action.title,
          filter: "all" as filterValuesType,
        },
        ...state,
      ];
    }
    case "CHANGE-TODOLIST-TITLE": {
      const stateCopy = state.map((tl) => ({ ...tl }));

      const todolist = stateCopy.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.title = action.title;
      }
      return stateCopy;
    }
    case "CHANGE-TODOLIST-FILTER": {
      const stateCopy = state.map((tl) => ({ ...tl }));
      const todolist = stateCopy.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }

      return stateCopy;
    }

    case"REORDER-TODOLIST": {
      const { newOrder} = action.payload;

      return newOrder;
    }
    default:
      return state;
  }
};

export const RemoveTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};
export const AddTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title: title, todolistId: v1() };
};
export const ChangeTodolistTitleAC = (
  todolistId: string,
  title: string
): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: title };
};
export const ChangeTodolistFilterAC = (
  todolistId: string,
  filter: filterValuesType
): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter };
};
export const AddTaskAC = (
  todolistId: string,
  title: string
): AddTaskActionType => {
  return { type: "ADD-TASK", id: todolistId, title: title };
};

export const reorderTodolistsAC = (newOrder: TodolistType[]):ReorderTodolistsActionType => {
  return {
    type: "REORDER-TODOLIST",
    payload: {newOrder}
  };
};
