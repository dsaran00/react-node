import { Action, Fetch, POST, PUT, DELETE, PreprocessResponse, ShowAlert } from '../../common/Utils'
import GlobalActions from '../../global/actions/GlobalActions'
import TicketsActions from '../../global/actions/TicketsActions'

export const CreateTicket =
  () => {

    // Show the spinner.
    spinner(true)

    Fetch('/ticket', POST())
      .then(PreprocessResponse, PreprocessResponse)
      .then(addTicket)
      .catch(ShowAlert)
      .finally(() => spinner(false))
  }

export const DeleteTicket =
  (ticketId) => {

    // Lock the ticket row and show the spinner.
    lock(ticketId)

    Fetch(`/ticket/${ticketId}`, DELETE())
      .then(PreprocessResponse, PreprocessResponse)
      .then(() => removeTicket(ticketId))
      .catch(ShowAlert)
      .finally(() => unlock(ticketId))
  }

export const AssignRequest =
  (ticketId) =>
    ({target}) => {

      // Lock the ticket row and show the spinner.
      lock(ticketId)

      const userId = Number(target.value)

      Fetch(`/ticket/${ticketId}/user/${userId}`, PUT())
        .then(PreprocessResponse, PreprocessResponse)
        .then(() => assignTicket(ticketId, userId))
        .catch(ShowAlert)
        .finally(() => unlock(ticketId))
    }

const addTicket =
  ({id}) =>
    Action(TicketsActions.AddTicket)(id)

const removeTicket =
  (ticketId) =>
    Action(TicketsActions.RemoveTicket)(ticketId)

const assignTicket =
  (ticketId, userId) =>
    Action(TicketsActions.AssignTicket)({ticketId, userId})

const lock =
  (ticketId) => {
    Action(TicketsActions.LockTicket)(ticketId)
    spinner(true)
  }

const unlock =
  (ticketId) => {
    Action(TicketsActions.UnlockTicket)(ticketId)
    spinner(false)
  }

const spinner =
  (show) =>
    Action(show ? GlobalActions.ShowSpinner : GlobalActions.HideSpinner)()
