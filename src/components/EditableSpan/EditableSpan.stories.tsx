import {EditableSpan} from "./EditableSpan.tsx";
import {action} from "@storybook/addon-actions";
export default {
  title: 'EditableSpan',
  component: EditableSpan,
}

const changeCallback = action("value change")

export const EditableSpanBaseExample = () => {
  return <EditableSpan title={"start value"} onChange={changeCallback}/>
}