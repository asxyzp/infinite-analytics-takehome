import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { formatEnum, jsonDisplay, timeTag } from 'src/lib/formatters'

const DELETE_INVOICE_MUTATION = gql`
  mutation DeleteInvoiceMutation($id: Int!) {
    deleteInvoice(id: $id) {
      id
    }
  }
`

const Invoice = ({ invoice }) => {
  const [deleteInvoice] = useMutation(DELETE_INVOICE_MUTATION, {
    onCompleted: () => {
      toast.success('Invoice deleted')
      navigate(routes.invoices())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete invoice ' + id + '?')) {
      deleteInvoice({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Invoice {invoice.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{invoice.id}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(invoice.createdAt)}</td>
            </tr>
            <tr>
              <th>Update at</th>
              <td>{timeTag(invoice.updateAt)}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{formatEnum(invoice.status)}</td>
            </tr>
            <tr>
              <th>Issue at</th>
              <td>{timeTag(invoice.issueAt)}</td>
            </tr>
            <tr>
              <th>Due at</th>
              <td>{timeTag(invoice.dueAt)}</td>
            </tr>
            <tr>
              <th>Seller name</th>
              <td>{invoice.sellerName}</td>
            </tr>
            <tr>
              <th>Seller address</th>
              <td>{invoice.sellerAddress}</td>
            </tr>
            <tr>
              <th>Seller phone</th>
              <td>{invoice.sellerPhone}</td>
            </tr>
            <tr>
              <th>Seller email</th>
              <td>{invoice.sellerEmail}</td>
            </tr>
            <tr>
              <th>Buyer name</th>
              <td>{invoice.buyerName}</td>
            </tr>
            <tr>
              <th>Buyer address</th>
              <td>{invoice.buyerAddress}</td>
            </tr>
            <tr>
              <th>Buyer phone</th>
              <td>{invoice.buyerPhone}</td>
            </tr>
            <tr>
              <th>Buyer email</th>
              <td>{invoice.buyerEmail}</td>
            </tr>
            <tr>
              <th>Line items</th>
              <td>{jsonDisplay(invoice.lineItems)}</td>
            </tr>
            <tr>
              <th>Payment terms</th>
              <td>{invoice.paymentTerms}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editInvoice({ id: invoice.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(invoice.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Invoice
