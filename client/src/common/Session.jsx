import React from 'react'
import { useSelector } from 'react-redux'
import { Typography, Toolbar } from '@material-ui/core'

const Session =
  () => {

    const {id, name} = useSelector(state => state.session)
    const isSession = id !== 0

    return (
      <Toolbar className="session">
      {isSession ?
        <Typography variant="h4">
          {name}
        </Typography> :
        null
      }
      </Toolbar>
    )
  }

export default Session
