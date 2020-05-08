const notNullNorEmpty =
  (string) =>
    string !== null && string !== undefined && string !== ''

const formatError =
  (error) =>
    ({error: error instanceof Error ? error.message : error})

const decideStatus =
  (error) =>
    error === 'ACCESS_DENIED' ?                               403 :
    error === 'NOT_FOUND' ?                                   404 :
    ['INVALID_DATA', 'EXISTING_USER_FOUND'].includes(error) ? 422 :
    /* default */                                             500

const sendError =
  (res) =>
    (error) =>
      res.status(decideStatus(error)).json(formatError(error))

module.exports = {notNullNorEmpty, sendError}
