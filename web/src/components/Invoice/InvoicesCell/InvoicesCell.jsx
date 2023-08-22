import { Box, Typography } from '@mui/material'

import { Link, routes } from '@redwoodjs/router'

import ErrorInvoicesImg from 'src/assets/error_invoices.svg'
import NoInvoicesImg from 'src/assets/no_invoices.svg'
import Button from 'src/components/Button/Button'
import Invoices from 'src/components/Invoice/Invoices'
import Loader, { FillPageContainer } from 'src/components/Loader/Loader'

// QUERIES AND MUTATIONS
export const QUERY = gql`
  query FindInvoices {
    invoices {
      id
      status
      title
      description
      dueAt
    }
  }
`

export const Loading = () => <Loader label="Loading invoices" />

export const Empty = () => {
  return (
    <FillPageContainer sx={{ textAlign: 'center' }}>
      <Box sx={{ p: '20px' }}>
        <img
          src={NoInvoicesImg}
          alt="No invoices"
          style={{ minWidth: '275px', marginBottom: '5px' }}
        />
        <Typography variant="h5" sx={{ fontWeight: 'bolder', mb: '5px' }}>
          No invoices found
        </Typography>
        <Button
          color="primary"
          variant="contained"
          size="small"
          component={Link}
          to={routes.newInvoice()}
        >
          Create a new invoice
        </Button>
      </Box>
    </FillPageContainer>
  )
}

export const Failure = () => {
  return (
    <FillPageContainer sx={{ textAlign: 'center' }}>
      <Box sx={{ p: '20px' }}>
        <img
          src={ErrorInvoicesImg}
          alt="No invoices"
          style={{ width: '275px', marginBottom: '5px' }}
        />
        <Typography variant="h5" sx={{ fontWeight: 'bolder', mb: '5px' }}>
          Something went wrong
        </Typography>
        <Button
          color="primary"
          variant="contained"
          size="small"
          component={Link}
          to={routes.invoices()}
        >
          Go back
        </Button>
      </Box>
    </FillPageContainer>
  )
}

export const Success = ({ invoices }) => {
  return <Invoices invoices={invoices} />
}
