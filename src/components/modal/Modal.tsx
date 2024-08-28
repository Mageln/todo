import React, { useState } from "react";
import { Login } from "../../pages/Login/Login";
import "../../style/components/Modal/Modal.scss";
import { Registration } from "../../pages/Registration/Registration";
import { Button } from "@mui/material";

export const Modal =React.memo( ({ active, setActive }) => {
    console.log("modal")
  const [currentComponent, setCurrentComponent] = useState("login");

  return (
    <div className={active ? "modal active" : "modal"}
    onClick={() => setActive(false)}
    >
      <div
        className={active ? "modal-content active" : "modal-content"}
        onClick={(e) => e.stopPropagation()}
      >
        {currentComponent === "login" ? <Login /> : <Registration />}
        <div className="switcher">
        {currentComponent === "login" ? (
            <Button style={{width:"400px"}} variant="contained" color="primary" onClick={() => setCurrentComponent("registation")}> Registration</Button>
        ):(
            <Button style={{width:"400px"}} variant="contained" color="primary" onClick={() => setCurrentComponent("login")}>Login</Button>
        )
    }
        </div>
      </div>
    </div>
  );
});
