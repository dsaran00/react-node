const mysql = require('mysql')

// Configure here your own connection parameters and credentials.
const createConnection =
  (host = 'localhost', user = 'root', password = 'root') =>
    mysql.createConnection({
      host,
      user,
      password,
      database: 'reactnode'
    })

const Query =
  (string, values) =>
    new Promise((resolve, reject) => {
      const connection = createConnection()
      connection.connect()
      connection.query(string, values, (error, results) => error ? reject(error) : resolve(results))
      connection.end()
    })

module.exports = Query
