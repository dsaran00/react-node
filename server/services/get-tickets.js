const Query = require('../utils/sql')
const GetAuthentication = require('../utils/auth')
const UserKind = require('../utils/UserKind')
const { sendError } = require('../utils/common')

const GetTickets =
  (req, res) =>
    GetAuthentication(req)                                            // Check if the user is authorized to access this service and get her kind.
      .then(({id, kind}) => ({id, kind, tickets: [], users: []}))     // Create a context object to store intermediate data.
      .then(getTickets)
      .then(getUsersIfAdministrator)
      .then(context => res.json({tickets: context.tickets, users: context.users}))
      .catch(sendError(res))

const getTickets =
  (context) =>
    (context.kind === UserKind.Admin ?  adminQuery() :
    /* otherwise */                     commonQuery(context.id))
    // Add found tickets to the context.
    .then(tickets => ({...context, tickets}))

const getUsersIfAdministrator =
  (context) =>
    (context.kind === UserKind.Admin ? usersQuery() :
    /* Common User */                  Promise.resolve([]))
    // Add found users to the context, only if the current user is Administrator.
    .then(users => ({...context, users}))

// For Administrator, get all tickets whatsoever.
const adminQuery =
  () => Query('SELECT id AS ticketId, id_user AS userId, ticket_pedido AS requested FROM ticket')

// For Common User, get her tickets only.
const commonQuery =
  (userId) => Query('SELECT id AS ticketId, id_user AS userId, ticket_pedido AS requested FROM ticket WHERE id_user = ?', userId)

// For Administrator, get all non-administrator users.
const usersQuery =
  () => Query('SELECT id, nombre AS name FROM usuarios WHERE id_tipouser = 2 ORDER BY name')

module.exports = GetTickets
