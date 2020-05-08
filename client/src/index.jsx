import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css'
import Application from './common/Application/Application'
import RootReducer from './global/reducers/RootReducer'

/*
This file is the integration point for the application's logic.
The app starts with a blank state, i.e. there's no user session.
This means that upon load it will always show the login screen.
In a production-level application it'd be expected to maintain the session across reloads,
  but it'd introduce a whole new level of complexity, which is also unnecessary considering the current requirements.
*/

export const Store = createStore(RootReducer)

ReactDOM.render(
  <Provider store={Store}>
    <Application/>
  </Provider>,
  window.document.getElementById('root')
)
