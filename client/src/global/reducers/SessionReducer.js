import DefaultState from '../DefaultState'
import SessionActions from '../actions/SessionActions'

const SessionReducer =
  (state = DefaultState.session, {type, ...params}) => {

    switch(type) {
      case SessionActions.LoadSession: return params.value
      default: return state
    }
  }

export default SessionReducer
