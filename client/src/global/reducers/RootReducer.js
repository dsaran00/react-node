import { combineReducers } from 'redux'
import GlobalReducer from './GlobalReducer'
import LoginReducer from './LoginReducer'
import RegisterReducer from './RegisterReducer'
import SessionReducer from './SessionReducer'
import TicketsReducer from './TicketsReducer'

const RootReducer = combineReducers({
    global: GlobalReducer,
    login: LoginReducer,
    register: RegisterReducer,
    session: SessionReducer,
    tickets: TicketsReducer,
  })

export default RootReducer
