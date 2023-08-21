import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Invoice/InvoicesCell'
import { formatEnum, jsonTruncate, timeTag, truncate } from 'src/lib/formatters'

const DELETE_INVOICE_MUTATION = gql`
  mutation DeleteInvoiceMutation($id: Int!) {
    deleteInvoice(id: $id) {
      id
    }
  }
`

const InvoicesList = ({ invoices }) => {
  const [deleteInvoice] = useMutation(DELETE_INVOICE_MUTATION, {
    onCompleted: () => {
      toast.success('Invoice deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete invoice ' + id + '?')) {
      deleteInvoice({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Created at</th>
            <th>Update at</th>
            <th>Status</th>
            <th>Title</th>
            <th>Description</th>
            <th>Issue at</th>
            <th>Due at</th>
            <th>Seller logo</th>
            <th>Seller name</th>
            <th>Seller address</th>
            <th>Seller phone</th>
            <th>Seller email</th>
            <th>Buyer name</th>
            <th>Buyer address</th>
            <th>Buyer phone</th>
            <th>Buyer email</th>
            <th>Line items</th>
            <th>Payment terms</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{truncate(invoice.id)}</td>
              <td>{timeTag(invoice.createdAt)}</td>
              <td>{timeTag(invoice.updateAt)}</td>
              <td>{formatEnum(invoice.status)}</td>
              <td>{truncate(invoice.title)}</td>
              <td>{truncate(invoice.description)}</td>
              <td>{timeTag(invoice.issueAt)}</td>
              <td>{timeTag(invoice.dueAt)}</td>
              <td>{truncate(invoice.sellerLogo)}</td>
              <td>{truncate(invoice.sellerName)}</td>
              <td>{truncate(invoice.sellerAddress)}</td>
              <td>{truncate(invoice.sellerPhone)}</td>
              <td>{truncate(invoice.sellerEmail)}</td>
              <td>{truncate(invoice.buyerName)}</td>
              <td>{truncate(invoice.buyerAddress)}</td>
              <td>{truncate(invoice.buyerPhone)}</td>
              <td>{truncate(invoice.buyerEmail)}</td>
              <td>{jsonTruncate(invoice.lineItems)}</td>
              <td>{truncate(invoice.paymentTerms)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.invoice({ id: invoice.id })}
                    title={'Show invoice ' + invoice.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editInvoice({ id: invoice.id })}
                    title={'Edit invoice ' + invoice.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete invoice ' + invoice.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(invoice.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default InvoicesList
