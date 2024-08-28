import { useEffect, useState } from "react";
import axios from "axios";
import { todolistAPI } from "../api/api";

export default {
  title: "API",
};



export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.getTodolists()
      .then((res) => {
        setState(res.data);
      });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
   todolistAPI.createTodolist("titile")
    .then((res) => {
      setState(res.data);
        
    });


  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const DeleateTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = "21329021312-=031232=231-123"
    todolistAPI.deleteTodolist(todolistId)
        .then((res) => {
            setState(res.data)
        })
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const UptadeTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.uptadeTodolistTitle()
    .then((res) => {
        setState(res.data)
    })
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};
