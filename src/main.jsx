import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MuiTheme from './theme/MuiTheme.jsx'
import { Provider } from 'react-redux'
import { persistedStore, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import './apis/axios.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <MuiTheme>
          <App />
        </MuiTheme>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
