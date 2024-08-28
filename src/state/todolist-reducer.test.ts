
import {v1} from "uuid";
import {filterValuesType,  TodolistType} from "../AppWithRedux.tsx";
import {  AddTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistReducer } from './todolist-reducer.ts';
import { test, expect } from 'vitest';






test('correct todolist should be removed', () => {
    const todolistId1 = v1();
    const todolistId2 = v1();
    const startState: Array<TodolistType> = [
        {id:todolistId1, title:"What to learn", filter: "all"},
        {id:todolistId2, title:"What to buy",filter: "all"},

    ]
const endState = todolistReducer (startState, RemoveTodolistAC(todolistId1))

expect(endState.length).toBe(1);
expect(endState[0].id).toBe(todolistId2)

});

test("correct todolist should be added", () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const newTodolistTitle = "New Todolist";

    const startState: Array<TodolistType> = [
        {id:todolistId1, title:"What to learn", filter: "all"},
        {id:todolistId2, title:"What to buy",filter: "all"},
    ]
    const endState = todolistReducer(startState, AddTodolistAC(newTodolistTitle)) ;
    
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all");
    expect(endState[0].id).toBeDefined()
})

test("correct replaces the title ", () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const  newTodolistTitle = "newTodolistTitle ";
    const startState: Array<TodolistType> = [
        {id:todolistId1, title:"What to learn", filter: "all"},
        {id:todolistId2, title:"What to buy",filter: "all"},
    ]
  
 

    const endState = todolistReducer(startState,  ChangeTodolistTitleAC(todolistId2,newTodolistTitle,));
    
    expect(endState[0].title).toBe("What to learn")
    expect(endState[1].title).toBe(newTodolistTitle)
})

test("correct filter of todolist should be change ", () => {
    const todolistId1 = v1();
    const todolistId2 = v1();

    const  newFilter: filterValuesType = "completed";
    const startState: Array<TodolistType> = [
        {id:todolistId1, title:"What to learn", filter: "all"},
        {id:todolistId2, title:"What to buy",filter: "all"},
    ]

    const action = ChangeTodolistFilterAC(todolistId2,newFilter)

    const endState = todolistReducer(startState, action);
    
    expect(endState[0].filter).toBe("all")
    expect(endState[1].filter).toBe(newFilter)
})


