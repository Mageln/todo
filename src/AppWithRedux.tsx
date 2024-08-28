import "./App.css";
import { TaskType, TodoList } from "./components/TodoList/TodoList";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Toolbar,
} from "@mui/material";
import Menu from "@mui/icons-material/Menu";
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  reorderTodolistsAC,
} from "./state/todolist-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import React, { useCallback, useState } from "react";
import "./style/them.css";
import { TodoListShowroom } from "./components/Theme/TodoListShowroom";
import { Reorder, useDragControls } from "framer-motion";
import { ReorderIcon } from "./assets/Icon/Icon";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
} from "react-router-dom";
import {Modal} from "./components/modal/Modal"

export type TodolistType = {
  id: string;
  title: string;
  filter: filterValuesType;
};
export type filterValuesType = "all" | "completed" | "active";
export type tasksObjStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithReducer() {
  const dispatch = useDispatch();
  const todolists = useSelector<AppRootState, Array<TodolistType>>(
    (state) => state.todolists
  );

  const changeFilter = useCallback(
    (value: filterValuesType, todolistId: string) => {
      dispatch(ChangeTodolistFilterAC(todolistId, value));
    },
    [dispatch]
  );

  const removeTodolist = useCallback(
    (todoListsId: string) => {
      const action = RemoveTodolistAC(todoListsId);
      dispatch(action);
    },
    [dispatch]
  );
  const changeTodolistTitle = useCallback(
    (id: string, newTitle: string) => {
      const action = ChangeTodolistTitleAC(id, newTitle);
      dispatch(action);
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    (title: string) => {
      const action = AddTodolistAC(title);
      dispatch(action);
    },
    [dispatch]
  );

  const handlerReorder = (newOrder: TodolistType[]) => {
    console.log(reorderTodolistsAC(newOrder));
    dispatch(reorderTodolistsAC(newOrder));
  };

  const controls = useDragControls();
  const [modalLoginActive, setModalLoginActive] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <AppBar position="static">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <NavLink>
              <Link
                style={{ listStyle: "none", color: "black", fontSize: "20px" }}
                to="/"
              >
                Todolist
              </Link>
            </NavLink>

            <Outlet />
            <Button onClick={() => setModalLoginActive(true)} color="warning">
              
              Login In
            </Button>
            <TodoListShowroom />
          </Toolbar>
        </AppBar>
        <Container fixed>
          <Grid container style={{ padding: "20px 0px 20px 0" }}>
            <Paper style={{ padding: "10px" }}>
              <AddItemForm addItem={addTodolist} />
            </Paper>
            <Modal active={modalLoginActive} setActive={setModalLoginActive} />
          </Grid>
          <Grid container spacing={3}>
            <Reorder.Group
              style={{
                display: "flex",
                padding: "20px",
                listStyle: "none",
                flexWrap: "wrap",
                gap: "10px",
              }}
              axis="x"
              values={todolists}
              onReorder={handlerReorder}
            >
              {todolists.map((tl) => {
                return (
                  <Reorder.Item value={tl} key={tl.id} dragControls={controls}>
                    <Grid item>
                      <Paper style={{ padding: "10px" }}>
                        <ReorderIcon dragControls={controls} />
                        <TodoList
                          key={tl.id}
                          id={tl.id}
                          title={tl.title}
                          filter={tl.filter}
                          removeTodolist={removeTodolist}
                          changeTodolistTitle={changeTodolistTitle}
                          changeFilter={changeFilter}
                        />
                      </Paper>
                    </Grid>
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>
          </Grid>
        </Container>
        <Routes>
          <Route path="/" />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppWithReducer;
