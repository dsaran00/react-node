import React from 'react'
import './Application.css'
import { useSelector } from 'react-redux'
import { Container, CircularProgress, AppBar } from '@material-ui/core'
import ErrorAlert from '../ErrorAlert'
import Session from '../Session'
import LoginScreen from '../../screens/Login/LoginScreen'
import RegisterScreen from '../../screens/Register/RegisterScreen'
import CommonUserScreen from '../../screens/CommonUser/CommonUserScreen'
import AdministratorScreen from '../../screens/Administrator/AdministratorScreen'

// Maps the name of the screen as found in the store, to its rendering function.
// This allows for flexible adding and removing of screens when needed.
const screenByName = {
  'login': LoginScreen,
  'register': RegisterScreen,
  'admin': AdministratorScreen,
  'user': CommonUserScreen,
}

const Application = () => {

  const {screen, waiting, error} = useSelector(state => state.global)

  // Call the rendering function corresponding to the current screen.
  // Show the spinner if there's an API call in progress.
  return (
    <>
      <AppBar position="static">
        <Session/>
        {waiting ? <CircularProgress color="secondary" className="spinner"/> : null}
      </AppBar>
      <Container maxWidth="sm" className="app">
        {screenByName[screen]()}
        {error ? <ErrorAlert>{error}</ErrorAlert> : null}
      </Container>
    </>
  )
}

export default Application
