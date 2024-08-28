import { v1 } from "uuid";
import { tasksObjStateType } from "../AppWithRedux";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolist-reducer";
import {TaskType} from "../components/TodoList/TodoList.tsx";



export type ActionsType =
  | AddTaskActionType
  | RemoveTaskActionType
  | ChangeTaskTitleActionType
  | ChangetasksObjtatusActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
| MoveTaskActionType
|ReorderTaskActionType


    export type AddTaskActionType = {
  type: "ADD-TASK";
  title: string;
  todolistId:string
};
export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  taskId: string;
  todolistId:string
};

export type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE";
  taskId: string;
  title: string;
  todolistId: string;
};

export type ChangetasksObjtatusActionType = {
    type: "CHANGE-TASK-STATUS"
    taskId:string;
    todolistId:string
    isDone: boolean
}

export type MoveTaskActionType = {
    type: "MOVE-TASK"
    task: TaskType
    fromTodolistId:string
    toTodolistId:string
}
export type ReorderTaskActionType = {
  payload: { newOrder: any; todolistId: string; };
  type : "REORDER-TASK"
  todlistId: string

}

// const todoLists1 = v1();
// const todoLists2 = v1();

const initialState:tasksObjStateType = {
  // [todoLists1]: [
  //   {
  //     id: v1(),
  //     title: "CSS",
  //     isDone: true,
  //   },
  //   {
  //     id: v1(),
  //     title: "JavaScript",
  //     isDone: true,
  //   },
  //   {
  //     id: v1(),
  //     title: "React",
  //     isDone: false,
  //   },
  // ],

  // [todoLists2]: [
  //   {
  //     id: v1(),
  //     title: "Book",
  //     isDone: true,
  //   },
  //   {
  //     id: v1(),
  //     title: "Milk",
  //     isDone: true,
  //   },
  // ],
}

export const taskReducer = (state: tasksObjStateType = initialState, action: ActionsType):tasksObjStateType => {

  switch (action.type) {


    case "REMOVE-TASK": {
        const stateCopy = {...state};
        const tasksObj = state[action.todolistId];
        const filteredTask = tasksObj.filter(t => t.id !== action.taskId)
        stateCopy[action.todolistId] = filteredTask
        return stateCopy
    }
   
    case "ADD-TASK": {
      const stateCopy = {...state };
      const newTask = {
        id: v1(),
        title: action.title,
        isDone: false,
      };
      const tasksObj = stateCopy[action.todolistId] || [];
      const newtasksObj = [newTask, ...tasksObj];
      stateCopy[action.todolistId] = newtasksObj;
      return stateCopy;
    }
   case "CHANGE-TASK-STATUS":{
    const stateCopy = {...state};
        //достаем нужный массив по todolistId
        const tasksObj = stateCopy[action.todolistId];
        stateCopy[action.todolistId] =  tasksObj.map(t => t.id === action.taskId ? {...t, isDone: action.isDone } : t);

        return stateCopy
 
   }
   case "CHANGE-TASK-TITLE": {
    
    const stateCopy = {...state};
    const tasksObj = stateCopy[action.todolistId];
    const newTasksObj = tasksObj.map(t => t.id === action.taskId ? {...t, title: action.title} : t);
    stateCopy[action.todolistId] = newTasksObj
    return stateCopy
   }
   case "ADD-TODOLIST": {
    const stateCopy = {...state};
    stateCopy[action.todolistId] = [];
    return stateCopy
   }
   case "REMOVE-TODOLIST": {
    const stateCopy = {...state}
    delete stateCopy[action.id]
    return stateCopy
   }
   case "REORDER-TASK": {
    const { newOrder, todolistId } = action.payload;
    const stateCopy = { ...state };
    stateCopy[todolistId] = newOrder;
    return stateCopy;
   }
  
     
      default:
    return state
  }
};

export const AddTaskAC = ( title: string,todolistId:string, ): AddTaskActionType => {
  return { type: "ADD-TASK",title,todolistId};
};
export const RemoveTaskAC = (taskId: string, todolistId:string): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", taskId:taskId ,todolistId:todolistId};
};

export const changeTasksObjStatusAC = (
    taskId: string,
     isDone:boolean,
      todolistId: string
    ):ChangetasksObjtatusActionType => {
    return{type: "CHANGE-TASK-STATUS", taskId,isDone,todolistId }
}
export const changeTaskTitleAC = (
    taskId: string,
     title:string,
     todolistId: string 
): ChangeTaskTitleActionType => {
    return{type:"CHANGE-TASK-TITLE", taskId,title,todolistId}
}

export const reorderTasksAC = (newOrder: TaskType[], todolistId: string) => {
  return{
    type: "REORDER-TASK",
    payload: {newOrder, todolistId}
  }
}
