const Query = require('../utils/sql')
const GetAuthentication = require('../utils/auth')
const UserKind = require('../utils/UserKind')
const { sendError } = require('../utils/common')

const OK = 'OK'
const NOT_FOUND = 'NOT_FOUND'
const ACCESS_DENIED = 'ACCESS_DENIED'

const DeleteTicket =
  (req, res) =>
    GetAuthentication(req)                              // Check if the user is authorized to access this service and get her kind.
      .then(checkIfAdministrator)                       // Common User can't delete tickets.
      .then(deleteTicketFromDatabase(req.params.id))    // Delete the new ticket from the database.
      .then(() => res.status(200).json({}))
      .catch(sendError(res))

const checkIfAdministrator =
  ({kind}) =>
    kind === UserKind.Admin ? Promise.resolve(OK) :
    /* Common User */         Promise.reject(ACCESS_DENIED)

const deleteTicketFromDatabase =
  (ticketId) =>
    Query('DELETE FROM ticket WHERE id = ?', ticketId)
      .then(results => results.affectedRows === 1 ? OK : Promise.reject(NOT_FOUND))

module.exports = DeleteTicket
