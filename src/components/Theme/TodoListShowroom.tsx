import { useEffect, useState } from "react"
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
export const TodoListShowroom = () => {

    const [theme, setTheme]= useState("theme1")
    
const toggleTheme = () => {
   const newTheme =(theme === "theme1" ? "theme2" : "theme1")
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme)
}

useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if(storedTheme){
        setTheme(storedTheme)
    }
},[])

useEffect(() => {
const backgroundColor = `var(--background-color-${theme})`
const fontColor = `var(--font-color-${theme})`

document.body.style.setProperty(`--background-color`,backgroundColor)
document.body.style.setProperty(`--font-color`,fontColor)
},[theme]) 

    return(
        <div>
            <button style={{background:"none",border:"none"}} onClick={toggleTheme} type="button">
               {theme === "theme1" ? <DarkModeIcon/> : <LightModeIcon/>}
            </button>
        </div>
    )
}
