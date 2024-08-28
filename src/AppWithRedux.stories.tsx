import AppWithRedux from "./AppWithRedux.tsx";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator.tsx";

export default {
  title: "AppWithRedux",
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
}



export const AppWithReduxBaseExample = () => {
  return <AppWithRedux />

}