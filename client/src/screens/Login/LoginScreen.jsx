import React from 'react'
import { useSelector } from 'react-redux'
import { Button, TextField, Link } from '@material-ui/core'
import Header from '../../common/Header'
import { Action, SetValue } from '../../common/Utils'
import LoginActions from '../../global/actions/LoginActions'
import GlobalActions from '../../global/actions/GlobalActions'
import { InitiateLogin } from './Login'

const LoginScreen = () => {

  const {email, password, locked} = useSelector(state => state.login)

  return (
    <>
      <Header>Inicia sesión</Header>
      
      <form disabled={locked}>
        <div className="spacer">
          <TextField
            label="Correo"
            disabled={locked}
            variant="outlined"
            value={email}
            onInput={SetValue(LoginActions.SetValue, 'email')}/>
        </div>
        <div className="spacer">
          <TextField
            label="Contraseña"
            disabled={locked}
            variant="outlined"
            type="password"
            value={password}
            onInput={SetValue(LoginActions.SetValue, 'password')}/>
        </div>
        <div className="spacer">
          <Button
            variant="contained"
            color="primary"
            disabled={locked}
            onClick={InitiateLogin}>Iniciar sesión</Button>
        </div>
      </form>
      
      <div className="spacer">
        <Link
          href="#"
          className={locked ? 'locked' : ''}
          onClick={Action(GlobalActions.ShowRegistration)}>Regístrate</Link>
      </div>
    </>
  )
}

export default LoginScreen
