import { Link, routes } from '@redwoodjs/router'

import Invoices from 'src/components/Invoice/Invoices'

export const QUERY = gql`
  query FindInvoices {
    invoices {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No invoices yet. '}
      <Link to={routes.newInvoice()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ invoices }) => {
  return <Invoices invoices={invoices} />
}
