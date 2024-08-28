
import React from 'react';
import { TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

type EditableSpanProps = {
  title: string;
onChange:(newValue: string)=> void;
};

export const EditableSpan = React.memo((props: EditableSpanProps)  => {
  console.log("EditableSpan is called")
  const [editMode, setEditMode] = useState(false);
  const [newTitle,setNewTitle] = useState("");


  const activatedEditMode = () => {
    setEditMode(true)
    setNewTitle(props.title)
};
  const activatedViewMode = () => {
    setEditMode(false)
    props.onChange(newTitle);
};
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value);
    
 

  return editMode ? (
    <TextField variant="standard" onBlur={activatedViewMode} onChange={onChangeTitleHandler} autoFocus value={newTitle} />
  ) : (
    <span onDoubleClick={activatedEditMode}>{props.title}</span>
  );
})
