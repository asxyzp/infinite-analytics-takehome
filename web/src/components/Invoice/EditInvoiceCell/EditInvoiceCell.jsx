import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import InvoiceForm from 'src/components/Invoice/InvoiceForm'

export const QUERY = gql`
  query EditInvoiceById($id: Int!) {
    invoice: invoice(id: $id) {
      id
      createdAt
      updateAt
      status
      issueAt
      dueAt
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
      issueAt
      dueAt
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

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ invoice }) => {
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
