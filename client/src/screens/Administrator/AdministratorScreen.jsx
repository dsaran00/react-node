import React from 'react'
import { useSelector } from 'react-redux'
import DeleteIcon from  '@material-ui/icons/Delete'
import AddIcon from  '@material-ui/icons/Add'
import { Button, Fab, Box, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem } from '@material-ui/core'
import Header from '../../common/Header'
import { CreateTicket, DeleteTicket, AssignRequest } from './Administrator'

const AdministratorScreen = () => {

  const {tickets, users} = useSelector(state => state.tickets)
  const areTickets = tickets.length > 0

  return (
    <>
      <Header>Gestión de Tickets</Header>

      <Fab className="add-ticket" color="primary" size="small" onClick={CreateTicket}>
        <AddIcon/>
      </Fab>

      {areTickets ?

        // If there are any tickets, show them in a table.
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{width: '20%'}}>ID Ticket</TableCell>
              <TableCell>Asignado A</TableCell>
              <TableCell style={{width: '20%'}}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map(ticketRow(users))}
          </TableBody>
        </Table> :

        // If there are no tickets, show a plain message.
        <Box className="empty">
          No tienes tickets.
        </Box>
      }
    </>
  )
}

const ticketRow =
  (users) =>
    ({ticketId, userId, locked}) =>
      <TableRow key={ticketId}>
        <TableCell>#{ticketId}</TableCell>
        <TableCell>{selectUser(users, userId, ticketId, locked)}</TableCell>
        <TableCell><Button disabled={locked} onClick={() => DeleteTicket(ticketId)}><DeleteIcon/></Button></TableCell>
      </TableRow>

const selectUser =
  (users, userId, ticketId, locked) =>
    <Select value={userId || 0} disabled={locked} onChange={AssignRequest(ticketId)}>
      <MenuItem key={0} value={0}><em>Nadie</em></MenuItem>
      {users.map(({id, name}) => <MenuItem key={id} value={id}>{name}</MenuItem>)}
    </Select>

export default AdministratorScreen
