import DefaultState from '../DefaultState'
import LoginActions from '../actions/LoginActions'

const LoginReducer =
  (state = DefaultState.login, {type, ...params}) => {

    switch(type) {
      case LoginActions.InitiateLogin: return {...state, locked: true}
      case LoginActions.TerminateLogin: return {...state, locked: false}
      case LoginActions.SetValue: return {...state, [params.field]: params.value}
      default: return state
    }
  }

export default LoginReducer
