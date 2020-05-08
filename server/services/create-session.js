const Query = require('../utils/sql')
const { sendError } = require('../utils/common')

const INVALID_DATA = 'INVALID_DATA'

const CreateSession =
  (req, res) => {

    const {email, password} = req.body

    // The password is kept in plain text. Obviously in production that would be a no-go, but here it'd only add innecessary complexity.
    const query = 'SELECT id, id_tipouser AS kind, nombre AS name, mail AS email FROM usuarios WHERE mail = ? AND pass = ?'

    Query(query, [email, password])
      .then(results => isOnlySingleUser(results) ? results[0] : Promise.reject(INVALID_DATA))
      .then(user => res.json(user))
      .catch(sendError(res))
  }

const isOnlySingleUser =
  (results) => results.length === 1

module.exports = CreateSession
