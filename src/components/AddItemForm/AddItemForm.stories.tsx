import {AddItemForm} from "./AddItemForm.tsx";
import {action} from "@storybook/addon-actions";
export default {
    title: 'AddItemForm',
    component: AddItemForm,
}

const callback = action("Button add was pressed inside the form");

export const AddItemFormBaseExample = () => {
    return <AddItemForm addItem={callback} />
}