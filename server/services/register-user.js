const Query = require('../utils/sql')
const { notNullNorEmpty, sendError } = require('../utils/common')

const OK = 'OK'
const EXISTING_USER_FOUND = 'EXISTING_USER_FOUND'
const INVALID_DATA = 'INVALID_DATA'

const RegisterUser =
  (req, res) => {

    const {kind, email, name, password} = req.body

    validateData(kind, email, name, password)                             // Do some basic validations of the input data.
      .then(() => checkIfExists(email))                                   // Check if a user with the same email already exists. If yes, can't register a new one.
      .then(() => saveNewUserAndGetId(kind, email, name, password))       // Save the new user in the database.
      .then(id => res.status(201).json({id, kind, name, email}))          // Finally respond with the complete user data.
      .catch(sendError(res))
  }

// The user kind must be either Administrator (1) or Common user (2) and none of email, name and password may be empty.
const validateData =
  (kind, email, name, password) =>
    [1, 2].includes(kind) && [email, name, password].every(notNullNorEmpty) ? Promise.resolve(OK) :
    /* otherwise */                                                           Promise.reject(INVALID_DATA)

const checkIfExists =
  (email) =>
    Query('SELECT id FROM usuarios WHERE mail = ?', email)
      .then(results => results.length > 0 ? Promise.reject(EXISTING_USER_FOUND) : OK)

// The password is kept in plain text. Obviously in production that would be a no-go, but here it'd only add innecessary complexity.
const saveNewUserAndGetId =
  (kind, email, name, password) =>
    Query('INSERT INTO usuarios (id_tipouser, nombre, mail, pass) VALUES (?, ?, ?, ?)', [kind, name, email, password])
      .then(results => results.insertId)

module.exports = RegisterUser
