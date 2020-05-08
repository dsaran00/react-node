import DefaultState from '../DefaultState'
import RegisterActions from '../actions/RegisterActions'

const RegisterReducer =
  (state = DefaultState.register, {type, ...params}) => {

    switch(type) {
      case RegisterActions.InitiateRegistration: return {...state, locked: true}
      case RegisterActions.TerminateRegistration: return {...state, locked: false}
      case RegisterActions.SetValue: return {...state, [params.field]: params.value}
      default: return state
    }
  }

export default RegisterReducer
