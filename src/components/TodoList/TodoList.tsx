import React from "react";
import { useCallback } from "react";
import { filterValuesType } from "../../AppWithRedux";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../style/components/TodoList/TodoList.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../../state/store";
import { AddTaskAC, reorderTasksAC } from "../../state/task-reducer";
import { Task } from "../Task/Task.tsx";
import { Reorder } from "framer-motion";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  changeFilter: (value: filterValuesType, todolistId: string) => void;
  filter: filterValuesType;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
};

export const TodoList = React.memo((props: PropsType) => {
  const dispatch = useDispatch();
  const tasks = useSelector<AppRootState, Array<TaskType>>(
    (state) => state.tasks[props.id] || []
  );

  const removeTodolist = useCallback(() => {
    props.removeTodolist(props.id);
  }, [props.id]);

  const changeTodolistTitle = useCallback(
    (newTitle: string) => {
      props.changeTodolistTitle(props.id, newTitle);
    },
    [props.id, props.changeTodolistTitle]
  );

  const onAllClickerHandler = useCallback(
    () => props.changeFilter("all", props.id),
    [props.changeFilter, props.id]
  );
  const onActiveClickerHandler = useCallback(
    () => props.changeFilter("active", props.id),
    [props.changeFilter, props.id]
  );
  const onCompletedClickerHandler = useCallback(
    () => props.changeFilter("completed", props.id),
    [props.changeFilter, props.id]
  );

  let tasksObjForTodoList = tasks;

  if (props.filter === "completed") {
    tasksObjForTodoList = tasks.filter((t) => t.isDone == true);
  }
  if (props.filter === "active") {
    tasksObjForTodoList = tasks.filter((t) => t.isDone == false);
  }

  

  return (
    <div className="TodoList">
      <div>
        <h3>
          <EditableSpan title={props.title} onChange={changeTodolistTitle} />
          <IconButton onClick={removeTodolist} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </h3>
        <div>
          <AddItemForm
            addItem={useCallback(
              (title) => dispatch(AddTaskAC(title, props.id)),
              [dispatch, props.id]
            )}
          />
        </div>
        <Reorder.Group
        style={{listStyle:"none", padding:"0"}}
        axis="y"
          values={tasksObjForTodoList}
          onReorder={(newOrder) => dispatch(reorderTasksAC(newOrder,props.id))}
        >
          {tasksObjForTodoList.map((t) => (
            <Reorder.Item value={t} key={t.id}>
              <Task task={t} todolistId={props.id} />
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <div>
          <Button
            color={"info"}
            variant={props.filter === "all" ? "contained" : "text"}
            onClick={onAllClickerHandler}
          >
            All
          </Button>
          <Button
            color={"primary"}
            variant={props.filter === "active" ? "contained" : "text"}
            onClick={onActiveClickerHandler}
          >
            Active
          </Button>
          <Button
            color={"secondary"}
            variant={props.filter === "completed" ? "contained" : "text"}
            onClick={onCompletedClickerHandler}
          >
            Completed
          </Button>
        </div>
      </div>
    </div>
  );
});
