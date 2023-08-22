import { Box, Typography } from '@mui/material'

import { Link, routes } from '@redwoodjs/router'

import ErrorInvoicesImg from 'src/assets/error_invoices.svg'
import NoInvoiceImg from 'src/assets/no_invoice.svg'
import Button from 'src/components/Button/Button'
import Invoice from 'src/components/Invoice/Invoice'
import Loader, { FillPageContainer } from 'src/components/Loader/Loader'

// QUERIES AND MUTATIONS
export const QUERY = gql`
  query FindInvoiceById($id: Int!) {
    invoice: invoice(id: $id) {
      id
      createdAt
      updateAt
      status
      title
      description
      issueAt
      dueAt
      sellerLogo
      sellerName
      sellerAddress
      sellerPhone
      sellerEmail
      buyerName
      buyerAddress
      buyerPhone
      buyerEmail
      lineItems
      paymentTerms
    }
  }
`

export const Loading = () => <Loader label="Loading invoices" />

export const Empty = () => {
  return (
    <FillPageContainer sx={{ textAlign: 'center' }}>
      <Box sx={{ p: '20px' }}>
        <img
          src={NoInvoiceImg}
          alt="No invoices"
          style={{ minWidth: '300px', marginBottom: '5px' }}
        />
        <Typography variant="h5" sx={{ fontWeight: 'bolder', mb: '5px' }}>
          No such invoice found
        </Typography>
        <Button color="primary" variant="contained" size="small">
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
export const Success = ({ invoice }) => {
  return <Invoice invoice={invoice} />
}
