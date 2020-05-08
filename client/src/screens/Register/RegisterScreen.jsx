import React from 'react'
import { useSelector } from 'react-redux'
import { Button, TextField, Radio, RadioGroup, FormControlLabel, Link } from '@material-ui/core'
import { Action, SetValue } from '../../common/Utils'
import UserKind from '../../common/UserKind'
import Header from '../../common/Header'
import RegisterActions from '../../global/actions/RegisterActions'
import GlobalActions from '../../global/actions/GlobalActions'
import { InitiateRegistration } from './Register'

const RegisterScreen = () => {

  const {kind, email, name, password, locked} = useSelector(state => state.register)

  return (
    <>
      <Header>Regístrate</Header>

      <form disabled={locked} className="register-form">
        <div className="spacer">
          <RadioGroup
            value={kind.toString()}
            disabled={locked}
            onChange={SetValue(RegisterActions.SetValue, 'kind')}>
            <FormControlLabel
              value={UserKind.User.toString()}
              disabled={locked}
              control={<Radio/>}
              label="Usuario común"/>
            <FormControlLabel
              value={UserKind.Admin.toString()}
              disabled={locked}
              control={<Radio/>}
              label="Administrador"/>
          </RadioGroup>
        </div>
        <div className="spacer">
          <TextField
            label="Nombre"
            disabled={locked}
            variant="outlined"
            value={name}
            onInput={SetValue(RegisterActions.SetValue, 'name')}/>
        </div>
        <div className="spacer">
          <TextField
            label="Correo"
            disabled={locked}
            variant="outlined"
            value={email}
            onInput={SetValue(RegisterActions.SetValue, 'email')}/>
          </div>
        <div className="spacer">
          <TextField
            label="Contraseña"
            disabled={locked}
            variant="outlined"
            value={password}
            onInput={SetValue(RegisterActions.SetValue, 'password')}/>
          </div>
        <div className="spacer">
          <Button
            variant="contained"
            color="primary"
            disabled={locked}
            onClick={InitiateRegistration}>Registrar usuario</Button>
          </div>
      </form>
      
      <div className="spacer">
        <Link
          href="#"
          className={locked ? 'locked' : ''}
          onClick={Action(GlobalActions.ShowLogin)}>Volver al inicio</Link>
      </div>
    </>
  )
}

export default RegisterScreen
