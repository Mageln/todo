import {IconButton, TextField } from '@mui/material';
import React, { KeyboardEvent, useState,ChangeEvent } from 'react'
import AddIcon from '@mui/icons-material/Add';
type AddItemFormPropsType = {
    addItem:(title:string)=> void;
  };
  

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("AdditemForm is called")
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [error, setError] = useState<string | null>(null);
  
    const onKeyChangeHandler = (e: KeyboardEvent<HTMLInputElement>) => {
     if(error !== null){
      setError(null);
     }
      if (e.key === "Enter") {
        addTask();
      }
    };
    const onNewTitleChangerHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setNewTaskTitle(e.currentTarget.value);
    };
  
    const addTask = () => {
        
      if (newTaskTitle.trim() === "") {
        return setError("Title is required");
      } else {
        props.addItem(newTaskTitle.trim());
        setNewTaskTitle("");
      }
    };
    return (
      <div>
        <TextField
        variant={"outlined"}
        label={"Type value"}
        error={!!error }
        helperText={error}
          type="text"
          value={newTaskTitle}
          onChange={onNewTitleChangerHandler}
          onKeyDown={onKeyChangeHandler}
        />
        <IconButton  color={"primary"}  onClick={addTask}>
        <AddIcon/>
        </IconButton>
       
      </div>
    );
  });