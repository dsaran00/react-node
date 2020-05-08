import DefaultState from '../DefaultState'
import GlobalActions from '../actions/GlobalActions'

const GlobalReducer =
  (state = DefaultState.global, {type, ...params}) => {

    switch(type) {
      case GlobalActions.ShowRegistration: return {...state, screen: 'register'}
      case GlobalActions.ShowLogin: return {...state, screen: 'login'}
      case GlobalActions.ShowSpinner: return {...state, waiting: true}
      case GlobalActions.HideSpinner: return {...state, waiting: false}
      case GlobalActions.ShowErrorAlert: return {...state, error: params.value}
      case GlobalActions.HideErrorAlert: return {...state, error: null}
      case GlobalActions.ShowAdministratorScreen: return {...state, screen: 'admin'}
      case GlobalActions.ShowCommonUserScreen: return {...state, screen: 'user'}
      default: return state
    }
  }

export default GlobalReducer
