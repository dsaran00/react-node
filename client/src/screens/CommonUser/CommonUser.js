import { Action, Fetch, PUT, PreprocessResponse, ShowAlert } from '../../common/Utils'
import GlobalActions from '../../global/actions/GlobalActions'
import TicketsActions from '../../global/actions/TicketsActions'

export const RequestTicket =
  (ticketId) => {

    // Lock the ticket button and show the spinner.
    lock(ticketId)

    Fetch(`/ticket/${ticketId}`, PUT())
      .then(PreprocessResponse, PreprocessResponse)
      .then(markTicketRequested(ticketId))
      .catch(ShowAlert)

      // Unlock the button and hide the spinner.
      .finally(() => unlock(ticketId))
  }

const markTicketRequested =
  (ticketId) =>
    Action(TicketsActions.MarkRequested)(ticketId)

const lock =
  (ticketId) => {
    Action(TicketsActions.LockTicket)(ticketId)
    Action(GlobalActions.ShowSpinner)()
  }

const unlock =
  (ticketId) => {
    Action(TicketsActions.UnlockTicket)(ticketId)
    Action(GlobalActions.HideSpinner)()
  }