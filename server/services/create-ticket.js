const Query = require('../utils/sql')
const GetAuthentication = require('../utils/auth')
const UserKind = require('../utils/UserKind')
const { sendError } = require('../utils/common')

const OK = 'OK'
const ACCESS_DENIED = 'ACCESS_DENIED'

const CreateTicket =
  (req, res) =>
    GetAuthentication(req)                      // Check if the user is authorized to access this service and get her kind.
      .then(checkIfAdministrator)               // Common User can't create tickets.
      .then(saveNewTicketAndGetId)              // Save the new ticket in the database.
      .then(id => res.status(201).json({id}))   // Return the ticket ID.
      .catch(sendError(res))

const checkIfAdministrator =
  ({kind}) =>
    kind === UserKind.Admin ? Promise.resolve(OK) :
    /* Common User */         Promise.reject(ACCESS_DENIED)

const saveNewTicketAndGetId =
  () =>
    Query('INSERT INTO ticket (id_user, ticket_pedido) VALUES (NULL, 0)')
      .then(results => results.insertId)

module.exports = CreateTicket
