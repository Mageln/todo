import axios from "axios";

const setting = {
    withCredentials: true,
    headers:{
      "API-KEY": "86963781-989a-45a9-b4b0-8f326e0ef8a3"
    }
  };

export const todolistAPI = {
    getTodolists(){
        const promise =  axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", setting)
        return promise
    },
    createTodolist(title:string){
        const promise = axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", setting)
        return promise
    },
    deleteTodolist(id:string){
        const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, setting)
        return promise
    },
    uptadeTodolistTitle(){
        const promise = axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, setting)
        return promise
    }
}