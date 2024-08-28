import "../../style/pages/Login/Login.scss";
import { useForm } from "react-hook-form";
import backgroundImg from "../../assets/Image/background.jpg"
import { Box, Button, TextField } from "@mui/material";
import React from "react";


export const Login = React.memo( () => {
    console.log("Login")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSumbit = (data) => {
    const userData = JSON.parse(localStorage.getItem(data.email));
    if (userData) {
      if (userData.password === data.password) {
        console.log(userData.name +  " You are succesfully Logged In");
      } else {
        console.log("Email or Password is not macthing with our record");
      }
    } else {
      console.log("Email or Password is not macthing with our record");
    }
  };
  return (
    <div className="login">
      <div className="login-content">
        <div className="login-header">
                <h1>Login</h1>
        </div>
       
        <div className="login-image">
            <img src={backgroundImg} alt="background" />
        </div>
      <Box
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSumbit)}
      style={{display:"flex",flexDirection:"column",gap:"20px", position:"relative", top:"150px"}}
      >

       

          <TextField label={"Email"} type="email" {...register("email", { required: true })} />
          {errors.email && (
            <span style={{ color: "red" }}>*Email* is mandatory</span>
          )}
          <TextField label={"Password"}  type="password" {...register("password")} />
          <Button variant="outlined" type={"submit"}  >
            login</Button>
      </Box>

      </div>
    </div>
  );
});
