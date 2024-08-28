import ReactDOM from 'react-dom/client'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import './index.css'
import "./style/them.css"
import AppWithRedux from './AppWithRedux.tsx'
import { Provider } from 'react-redux'
import { store } from './state/store.ts'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    
    <DndProvider backend={HTML5Backend}>
    <AppWithRedux />
    </DndProvider>
  </Provider>

)
