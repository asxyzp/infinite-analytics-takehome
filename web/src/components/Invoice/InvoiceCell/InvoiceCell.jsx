import Invoice from 'src/components/Invoice/Invoice'

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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Invoice not found</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ invoice }) => {
  return <Invoice invoice={invoice} />
}
