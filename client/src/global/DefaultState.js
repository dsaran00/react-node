import UserKind from '../common/UserKind'

/*
The use of a centralized store allows for a better reasoning about the application's state.
Redux is, in my view, the best utility to facilitate keeping a centralized store.
*/

const DefaultState = {

	global: {
		screen: 'login',				// The currently visible screen (eg. login, register, admin, user).
		waiting: false,					// Is there an API call in progress? Used to show the spinner.
		error: null,						// Whether an error message is to be shown.
	},
	
	// The login form.
  login: {
    email: '',
    password: '',
		locked: false,					// All forms have a 'locked' flag to indicate their UI state being locked (disabled).
														// This prevents accidental multiple clicks which would otherwise result in race conditions.
	},
	
	// The user registration form.
  register: {
    kind: UserKind.User,		// The user can register herself as a common user or an administrator, as per the requirements.
	  email: '',
	  name: '',
    password: '',
    locked: false,
	},
	
	// The current session.
  session: {
	  kind: null,						// The kind of the currently logged-in user (administrator, common user, nobody).
	  id: 0,
	  name: '',
	  email: '',
	},
	
	tickets: {
		/* The list of tickets. Each element of the array is an object such as:
		{
			ticketId: number, database ID of the ticket.
			userId: number | null, database ID of the user assigned to the ticket, or null, if no user is assigned.
			requested: boolean, "ticket_pedido".
			locked: boolean, UI locked flag applied to this particular ticket.
		} */
		tickets: [],

		/* The list of users. The array contains elements only if the current user is an administrator.
		Each element of the array is an object such as:
		{
			id: number, database ID of the user.
			name: string, name of the user.
		} */
		users: [],
	},
}

export default DefaultState
