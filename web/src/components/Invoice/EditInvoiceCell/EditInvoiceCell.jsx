import { Box, Typography } from '@mui/material'

import { Link, navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ErrorInvoicesImg from 'src/assets/error_invoices.svg'
import Button from 'src/components/Button/Button'
import InvoiceForm from 'src/components/Invoice/InvoiceForm'
import Loader, { FillPageContainer } from 'src/components/Loader/Loader'

// QUERIES AND MUTATIONS
export const QUERY = gql`
  query EditInvoiceById($id: Int!) {
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
const UPDATE_INVOICE_MUTATION = gql`
  mutation UpdateInvoiceMutation($id: Int!, $input: UpdateInvoiceInput!) {
    updateInvoice(id: $id, input: $input) {
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

export const Loading = () => <Loader label="Loading invoice" />

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
  // MUTATION METHODS
  const [updateInvoice, { loading, error }] = useMutation(
    UPDATE_INVOICE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Invoice updated')
        navigate(routes.invoices())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  // METHODS
  /**
   * @name onSave
   * @description METHOD TO SAVE INVOICE
   * @param {*} input INPUT OBJECT
   * @param {*} id INPUT ID
   */
  const onSave = (input, id) => {
    updateInvoice({ variables: { id, input } })
  }

  return (
    <InvoiceForm
      invoice={invoice}
      onSave={onSave}
      error={error}
      loading={loading}
    />
  )
}
