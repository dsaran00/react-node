const Query = require('../utils/sql')
const GetAuthentication = require('../utils/auth')
const UserKind = require('../utils/UserKind')
const { sendError } = require('../utils/common')

const OK = 'OK'
const NOT_FOUND = 'NOT_FOUND'
const ACCESS_DENIED = 'ACCESS_DENIED'

const AssignTicketToUser =
  (req, res) =>
    GetAuthentication(req)                                    // Check if the user is authorized to access this service and get her kind.
      .then(checkIfAdministrator)                             // Common User can't assign tickets.
      .then(() => createContext(req))
      .then(assignTicket)                                     // Assign the given ticket to the given user.
      .then(() => res.status(200).json({}))
      .catch(sendError(res))

const createContext =
  ({params}) => ({
    ticketId: Number(params.ticketId),
    userId: Number(params.userId)
  })

const checkIfAdministrator =
  ({kind}) =>
    kind === UserKind.Admin ? Promise.resolve(OK) :
    /* Common User */         Promise.reject(ACCESS_DENIED)

const assignTicket =
  ({ticketId, userId}) =>
    Query('UPDATE ticket SET id_user = ? WHERE id = ?', [userId || null, ticketId])
      .then(results => results.affectedRows === 1 ? OK : Promise.reject(NOT_FOUND))

module.exports = AssignTicketToUser
