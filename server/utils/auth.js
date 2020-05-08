const GetAuthentication =
  (req) =>
    Promise.resolve(decodeBase64(getRawToken(getHeaderValue(req))))
      .then(parseJSON)

const getHeaderValue =
  (req) => req.get('Authorization') || ''

const getRawToken =
  (header) => header.split(' ')[1] || ''

const decodeBase64 = 
  (encoded) =>
    Buffer.from(encoded, 'base64').toString()

const parseJSON =
  (string) => {
    try { return JSON.parse(string) }
    catch(error) { return Promise.reject('ACCESS_DENIED') }
  }

module.exports = GetAuthentication
