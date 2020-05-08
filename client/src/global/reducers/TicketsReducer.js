import DefaultState from '../DefaultState'
import TicketsActions from '../actions/TicketsActions'

const TicketsReducer =
  (state = DefaultState.tickets, {type, ...params}) => {

    switch(type) {
      case TicketsActions.LockTicket: return make(state.tickets.map(toggleLock(params.value, true)), state.users)
      
      case TicketsActions.UnlockTicket: return make(state.tickets.map(toggleLock(params.value, false)), state.users)
      
      case TicketsActions.MarkRequested: return make(state.tickets.map(markRequested(params.value)), state.users)
      
      case TicketsActions.AddTicket: return make(state.tickets.concat({ticketId: params.value, userId: null, requested: false, locked: false}), state.users)
      
      case TicketsActions.LoadTicketsAndUsers: return make(params.value.tickets.map(ticket => ({...ticket, requested: !!ticket.requested, locked: false})), params.value.users)
      
      case TicketsActions.RemoveTicket: return make(state.tickets.filter(ticket => ticket.ticketId !== params.value), state.users)

      case TicketsActions.AssignTicket: return make(state.tickets.map(assignTicket(params.value.ticketId, params.value.userId)), state.users)

      default: return state
    }
  }

const make =
  (tickets, users) => ({tickets, users})

const toggleLock =
  (ticketId, locked) =>
    (ticket) =>
      ticket.ticketId === ticketId ? {...ticket, locked} : ticket

const markRequested =
  (ticketId) =>
    (ticket) =>
      ticket.ticketId === ticketId ? {...ticket, requested: true} : ticket

const assignTicket =
  (ticketId, userId) =>
    (ticket) =>
      ticket.ticketId === ticketId ? {...ticket, userId} : ticket

export default TicketsReducer
