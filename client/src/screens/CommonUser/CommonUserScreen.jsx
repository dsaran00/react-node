import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Box, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import Header from '../../common/Header'
import { RequestTicket } from './CommonUser'

const CommonUserScreen = () => {

  const tickets = useSelector(state => state.tickets.tickets)
  const areTickets = tickets.length > 0

  return (
    <>
      <Header>Tus Tickets</Header>
      
      {areTickets ?

        // If there are tickets assigned to this user, show them in a table.
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={{width: '20%'}}>ID Ticket</TableCell>
              <TableCell>¿Pedido?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map(TicketRow)}
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

const TicketRow =
  ({ticketId, requested, locked}) => 
    <TableRow key={ticketId}>
      <TableCell>#{ticketId}</TableCell>
      <TableCell>{requested ? 'Sí' : <>No,
        <Button
          variant="contained"
          color="primary"
          size="small"
          className="request-button" 
          disabled={locked}
          onClick={() => RequestTicket(ticketId)}>Pedir</Button></>}
        </TableCell>
    </TableRow>

export default CommonUserScreen
