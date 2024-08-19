import {useDispatch} from "react-redux";
import {changeTasksObjStatusAC, changeTaskTitleAC, RemoveTaskAC} from "../../state/task-reducer.ts";
import React, {ChangeEvent, useCallback} from "react";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../EditableSpan/EditableSpan.tsx";
import {IconButton} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType} from "../TodoList/TodoList.tsx";

type TaskPropsType = {
    todolistId:string,
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch();



    const onClickHandler = useCallback(() => dispatch(RemoveTaskAC(props.task.id, props.todolistId)),[dispatch, props.todolistId, props.task]);
    const onChangeStatusHandler =useCallback ((e: ChangeEvent<HTMLInputElement>) => {

        const newIsDoneValue = e.currentTarget.checked
        dispatch(changeTasksObjStatusAC(props.task.id, newIsDoneValue, props.todolistId));
    },[dispatch, props.todolistId, props.task]);
    const onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId));
    },[dispatch, props.todolistId, props.task.id, props.task.title]);


    return (
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                color={"success"}
                checked={props.task.isDone}
                onChange={onChangeStatusHandler}
            />
            <EditableSpan onChange={onChangeTitleHandler} title={props.task.title} />
            <IconButton onClick={onClickHandler} aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </div>
    );
})
