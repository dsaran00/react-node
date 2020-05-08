import React from 'react'
import { Box, Typography } from '@material-ui/core'

const Header =
  ({children}) =>
    <Box className="header">
      <Typography variant="h3">
        {children}
      </Typography>
    </Box>

export default Header
