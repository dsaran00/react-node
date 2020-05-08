import React from 'react'
import { Snackbar } from '@material-ui/core'
import GlobalActions from '../global/actions/GlobalActions'
import { Action } from '../common/Utils'

const ErrorAlert =
  ({children}) =>
    <Snackbar open={true} autoHideDuration={3000} message={children} onClose={Action(GlobalActions.HideErrorAlert)}/>

export default ErrorAlert
