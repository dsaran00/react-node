import { Store } from '../index'
import GlobalActions from '../global/actions/GlobalActions'

// Default connection timeout.
const DEFAULT_TIMEOUT = 5000                // 5 seconds.

const BASE_URL = 'http://localhost:4000'    // Where the backend server is.

// A helper function that makes an action of the given names and params. The action may be later executed somewhere else.
export const Action =
  (action, params) =>
    (value) => Store.dispatch({type: action, ...params, value})

// A helper function that updates an object property using a form field value.
export const SetValue =
  (action, field) =>
    (event) =>
      Action(action, {field})(event.target.value)

// Like the native fetch function, but supports a connection timeout.
export const Fetch =
  (url, options, timeout = DEFAULT_TIMEOUT) =>
    Promise.race([
      fetch(processURL(url), options),
      new Promise((_, reject) => window.setTimeout(() => reject(Error('El servidor se demoró demasiado tiempo para responder.')), options.timeout || timeout))
    ])

// Makes sure the are no superfluous slashes in the URL.
const processURL =
  (url) =>
    [BASE_URL, url]
      .map(string => string.match(/^\/?(.*?)\/?$/)[1])          // Strip the leading and trailing slashes, if found.
      .join('/')

// A generic helper function to prepare a PUT, POST or DELETE request.
const prepareRequest =
  (method) =>
    (payload) => ({
      method,
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getCredentials()}`,
      },
      body: payload ? JSON.stringify(payload) : null
    })

// Poor man's JWT, but works indeed.
const getCredentials =
  () => {
    const {id, kind} = Store.getState().session
    return btoa(JSON.stringify({id, kind}))
  }

export const GET = prepareRequest('GET')

export const PUT = prepareRequest('PUT')

export const POST = prepareRequest('POST')

export const DELETE = prepareRequest('DELETE')

// Processes the response looking for errors.
export const PreprocessResponse =
  (response) =>
    response instanceof Error ?       Promise.reject(Error('Ocurrió un problema con la conexión al servidor.')) :
    /* apparently correct response */ response.json().then(getErrorFromResponse, getErrorFromResponse)

const knownErrors = {
  ACCESS_DENIED: 'Acceso denegado.',
  NOT_FOUND: 'El recurso no existe.',
  INVALID_DATA: 'Los datos están incorrectos.',
  EXISTING_USER_FOUND: 'Usuario con el mismo correo ya existe.',
}

const getErrorFromResponse =
  (jsonOrError) =>
    jsonOrError instanceof Error ? Promise.reject(Error('La respuesta del servidor tiene un error.')) :
    'error' in jsonOrError ?       Promise.reject(Error(jsonOrError.error in knownErrors ? knownErrors[jsonOrError.error] : 'Ocurrió un error en el servidor.')) :                               
    /* no error */                 jsonOrError

export const ShowAlert =
  (error) => Action(GlobalActions.ShowErrorAlert)(error.message)
