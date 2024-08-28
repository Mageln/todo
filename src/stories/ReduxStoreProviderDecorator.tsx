import {Provider} from "react-redux";
import {store} from "../state/store.ts";



// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ReduxStoreProviderDecorator = (story:any) => {
    return <Provider store={store}>
        {story()}
    </Provider>
}