import {Task} from "./Task.tsx";
import {ReduxStoreProviderDecorator} from "../../stories/ReduxStoreProviderDecorator.tsx";
export default {
    title: "Task",
    component: Task,
    decorators:[ReduxStoreProviderDecorator]
}



export const AppWithReduxBaseExample = () => {
    return <>
        <Task
        task={{title:"CSS",isDone:false,id:"1"}}
        todolistId={"todolistId1"}
        />   <Task
        task={{title:"React",isDone:true,id:"2"}}
        todolistId={"todolistId2"}
        />
</>
}