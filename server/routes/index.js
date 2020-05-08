const express = require('express')
const CreateSession = require('../services/create-session')
const RegisterUser = require('../services/register-user')
const GetTickets = require('../services/get-tickets')
const CreateTicket = require('../services/create-ticket')
const DeleteTicket = require('../services/delete-ticket')
const AssignTicketToUser = require('../services/assign-ticket')
const RequestTicket = require('../services/request-ticket')

const router = express.Router()
module.exports = router

// All routes. Function names are self-explanatory.
router.post('/login', CreateSession)

router.post('/register', RegisterUser)

router.get('/tickets', GetTickets)

router.post('/ticket', CreateTicket)

router.delete('/ticket/:id', DeleteTicket)

router.put('/ticket/:ticketId/user/:userId', AssignTicketToUser)

router.put('/ticket/:id', RequestTicket)
