const Query = require('../utils/sql')
const GetAuthentication = require('../utils/auth')
const UserKind = require('../utils/UserKind')
const { sendError } = require('../utils/common')

const OK = 'OK'
const NOT_FOUND = 'NOT_FOUND'
const ACCESS_DENIED = 'ACCESS_DENIED'

const RequestTicket =
  (req, res) =>
    GetAuthentication(req)                                    // Check if the user is authorized to access this service and get her kind.
      .then(checkIfCommonUser)                                // Administrator can't request tickets.
      .then(userId => requestTicket(req.params.id, userId))   // Assign the given ticket to the given user.
      .then(() => res.status(200).json({}))
      .catch(sendError(res))

const checkIfCommonUser =
  ({id, kind}) =>
    kind === UserKind.User ? Promise.resolve(id) :
    /* Administrator */      Promise.reject(ACCESS_DENIED)

const requestTicket =
  (ticketId, userId) =>
    Query('UPDATE ticket SET ticket_pedido = 1 WHERE id = ? AND id_user = ?', [ticketId, userId])
      .then(results => results.affectedRows === 1 ? OK : Promise.reject(NOT_FOUND))

module.exports = RequestTicket
