import { Store } from '../../index'
import { Action, Fetch, POST, GET, PreprocessResponse, ShowAlert } from '../../common/Utils'
import UserKind from '../../common/UserKind'
import GlobalActions from '../../global/actions/GlobalActions'
import SessionActions from '../../global/actions/SessionActions'
import LoginActions from '../../global/actions/LoginActions'
import TicketsActions from '../../global/actions/TicketsActions'

export const InitiateLogin =
  () => {
  
    const {email, password} = Store.getState().login

    // Can't log in without email and password.
    if(email === '' || password === '') {
      Action(GlobalActions.ShowErrorAlert)('El correo o la contraseña está vacío.')
      return
    }

    // Lock the form and show the spinner.
    lock()

    Fetch('/login', POST({email, password}))
      .then(PreprocessResponse, PreprocessResponse)
      .then(InitiateSession)
      .catch(ShowAlert)
      .finally(unlock)              // Unlock the form and hide the spinner.
  }

// Initiates the session after a successfull login or new user registration.
export const InitiateSession =
  (session) => {

    // Load the session and show the screen corresponding to the user kind.
    Action(SessionActions.LoadSession)(session)
    Action(session.kind === UserKind.Admin ? GlobalActions.ShowAdministratorScreen : GlobalActions.ShowCommonUserScreen)()

    // Load the tickets.
    return Fetch('/tickets', GET())
      .then(PreprocessResponse, PreprocessResponse)
      .then(Action(TicketsActions.LoadTicketsAndUsers))
      .catch(ShowAlert)
      .finally(unlock)            // Unlock the form and hide the spinner.
  }

const lock =
  () => {
    Action(LoginActions.InitiateLogin)()
    Action(GlobalActions.ShowSpinner)()
  }

const unlock =
  () => {
    Action(LoginActions.TerminateLogin)()
    Action(GlobalActions.HideSpinner)()
  }