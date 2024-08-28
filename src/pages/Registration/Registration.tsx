import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";



export const Registration = React.memo( () => {
    console.log("Regista")
    const {register , handleSubmit, formState:{errors}} = useForm();

    const onSumbit = (data) => {
        localStorage.setItem(data.email, JSON.stringify({
            name:data.name,
            password:data.password
        }))
        console.log(JSON.parse(localStorage.getItem(data.email)))
    }
  return (

    <div>
        <p>Registration</p>
        <Box style={{display:"flex"}}>
        <form onSubmit={handleSubmit(onSumbit)}>
    <TextField label={"Name"} type="text" {...register("name")} />
    <TextField label={"Email"} type="email" {...register("email", {required: true})} />
    {errors.email && <span style={{color:"red"}}>
        Email is mandatory
        </span>}
        <TextField label={"Password"} type="password" {...register("password")} />
        <Button type={"submit"}  variant="contained" > Registration</Button>
        </form>

        </Box>
    </div>
  );
});
