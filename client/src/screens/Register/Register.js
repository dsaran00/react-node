import { Store } from '../../index'
import { Action, Fetch, POST, PreprocessResponse, ShowAlert } from '../../common/Utils'
import GlobalActions from '../../global/actions/GlobalActions'
import RegisterActions from '../../global/actions/RegisterActions'
import { InitiateSession } from '../Login/Login'

export const InitiateRegistration =
  () => {

    const {kind, email, name, password} = Store.getState().register

    // Can't register a user without email, name and password.
    // Email format validation is a world in itself, so we just skip it here entirely for simplicity.
    if(email === '' || name === '' || password === '') {
      Action(GlobalActions.ShowErrorAlert)('El correo, el nombre o la contraseña está vacío.')
      return
    }

    // Lock the form and show the spinner.
    lock()

    Fetch('/register', POST({kind: Number(kind), email, name, password}))
      .then(PreprocessResponse, PreprocessResponse)
      .then(InitiateSession)
      .catch(ShowAlert)
      .finally(unlock)          // Unlock the form and hide the spinner.
  }


const lock =
  () => {
    Action(RegisterActions.InitiateRegistration)()
    Action(GlobalActions.ShowSpinner)()
  }

const unlock =
  () => {
    Action(RegisterActions.TerminateRegistration)()
    Action(GlobalActions.HideSpinner)()
  }
