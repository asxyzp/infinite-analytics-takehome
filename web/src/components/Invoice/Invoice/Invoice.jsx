import { Delete, Edit, Visibility } from '@mui/icons-material'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { useRecoilState } from 'recoil'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import '../InvoiceForm/invoiceForm.css'

import Button from 'src/components/Button/Button'
import InvoiceView from 'src/components/InvoiceView/InvoiceView'
import { modalTypeAtom, sharedDataAtom } from 'src/contexts/atoms'

import { InvoiceContainer } from '../InvoiceForm'
import { formatDueAt } from '../Invoices'

// MUTATIONS AND QUERIES
const DELETE_INVOICE_MUTATION = gql`
  mutation DeleteInvoiceMutation($id: Int!) {
    deleteInvoice(id: $id) {
      id
    }
  }
`

const Invoice = ({ invoice }) => {
  // GETTING ATOMIC STATES
  const [modalType, setModalType] = useRecoilState(modalTypeAtom)
  const [sharedData, setSharedData] = useRecoilState(sharedDataAtom)

  // SETTING MEDIA QUERY
  const isSmallDesktop = useMediaQuery('(max-width:1200px)')

  // MUTATION METHODS
  const [deleteInvoice] = useMutation(DELETE_INVOICE_MUTATION, {
    onCompleted: () => {
      toast.success('Invoice deleted')
      navigate(routes.invoices())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  // METHODS

  /**
   * @name setInvoiceModal
   * @description VIEWING INVOICE MODAL
   * @returns {undefined} undefined
   */
  const setInvoiceModal = () => {
    setSharedData(invoice)
    setModalType('invoice')
  }

  /**
   * @name onDeleteClick
   * @description METHOD TO DELETE THE INVOICE
   * @param {*} id INVOICE ID
   * @returns {undefined} undefined
   */
  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete invoice ' + id + '?')) {
      deleteInvoice({ variables: { id } })
    }
  }

  return (
    <InvoiceContainer className="invoice-container">
      <Box className="invoice-form">
        <Typography variant="h6" className="form-title">
          View invoice
        </Typography>
        <Typography variant="body2" className="form-description">
          View details of an existing invoice
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bolder' }}>
          Title
        </Typography>
        <Typography variant="body2" sx={{ mb: '10px' }}>
          {invoice.title}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bolder' }}>
          Description
        </Typography>
        <Typography variant="body2" sx={{ mb: '10px' }}>
          {invoice.description}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bolder' }}>
          Seller Name
        </Typography>
        <Typography variant="body2" sx={{ mb: '10px' }}>
          {invoice.sellerName}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bolder' }}>
          Buyer Name
        </Typography>
        <Typography variant="body2" sx={{ mb: '10px' }}>
          {invoice.buyerName}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bolder' }}>
          Issue Date
        </Typography>
        <Typography variant="body2" sx={{ mb: '10px' }}>
          {formatDueAt(invoice.issueAt)}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 'bolder' }}>
          Due Date
        </Typography>
        <Typography variant="body2" sx={{ mb: '20px' }}>
          {formatDueAt(invoice.dueAt)}
        </Typography>
        {isSmallDesktop && (
          <Button
            variant="outlined"
            size="small"
            margin="medium"
            fullWidth
            startIcon={<Visibility />}
            onClick={setInvoiceModal}
          >
            View invoice
          </Button>
        )}
        <Button
          variant="contained"
          component={Link}
          size="small"
          margin="medium"
          fullWidth
          startIcon={<Edit />}
          to={routes.editInvoice({ id: invoice.id })}
        >
          Edit invoice
        </Button>
        <Button
          variant="contained"
          size="small"
          margin="medium"
          fullWidth
          color="error"
          startIcon={<Delete />}
          onClick={() => onDeleteClick(invoice.id)}
        >
          Delete invoice
        </Button>
      </Box>
      <Box className="invoice-preview-container">
        <InvoiceView
          id={invoice.id}
          dueAt={formatDueAt(invoice.dueAt)}
          sellerName={invoice.sellerName}
          sellerPhone={invoice.sellerPhone}
          sellerEmail={invoice.sellerEmail}
          sellerAddress={invoice.sellerAddress}
          buyerName={invoice.buyerName}
          buyerPhone={invoice.buyerPhone}
          buyerEmail={invoice.buyerEmail}
          buyerAddress={invoice.buyerAddress}
          lineItems={invoice.lineItems}
          paymentTerms={invoice.paymentTerms}
        />
      </Box>
    </InvoiceContainer>
    // <>
    //   <div className="rw-segment">
    //     <header className="rw-segment-header">
    //       <h2 className="rw-heading rw-heading-secondary">
    //         Invoice {invoice.id} Detail
    //       </h2>
    //     </header>
    //     <table className="rw-table">
    //       <tbody>
    //         <tr>
    //           <th>Id</th>
    //           <td>{invoice.id}</td>
    //         </tr>
    //         <tr>
    //           <th>Created at</th>
    //           <td>{timeTag(invoice.createdAt)}</td>
    //         </tr>
    //         <tr>
    //           <th>Update at</th>
    //           <td>{timeTag(invoice.updateAt)}</td>
    //         </tr>
    //         <tr>
    //           <th>Status</th>
    //           <td>{formatEnum(invoice.status)}</td>
    //         </tr>
    //         <tr>
    //           <th>Title</th>
    //           <td>{invoice.title}</td>
    //         </tr>
    //         <tr>
    //           <th>Description</th>
    //           <td>{invoice.description}</td>
    //         </tr>
    //         <tr>
    //           <th>Issue at</th>
    //           <td>{timeTag(invoice.issueAt)}</td>
    //         </tr>
    //         <tr>
    //           <th>Due at</th>
    //           <td>{timeTag(invoice.dueAt)}</td>
    //         </tr>
    //         <tr>
    //           <th>Seller logo</th>
    //           <td>{invoice.sellerLogo}</td>
    //         </tr>
    //         <tr>
    //           <th>Seller name</th>
    //           <td>{invoice.sellerName}</td>
    //         </tr>
    //         <tr>
    //           <th>Seller address</th>
    //           <td>{invoice.sellerAddress}</td>
    //         </tr>
    //         <tr>
    //           <th>Seller phone</th>
    //           <td>{invoice.sellerPhone}</td>
    //         </tr>
    //         <tr>
    //           <th>Seller email</th>
    //           <td>{invoice.sellerEmail}</td>
    //         </tr>
    //         <tr>
    //           <th>Buyer name</th>
    //           <td>{invoice.buyerName}</td>
    //         </tr>
    //         <tr>
    //           <th>Buyer address</th>
    //           <td>{invoice.buyerAddress}</td>
    //         </tr>
    //         <tr>
    //           <th>Buyer phone</th>
    //           <td>{invoice.buyerPhone}</td>
    //         </tr>
    //         <tr>
    //           <th>Buyer email</th>
    //           <td>{invoice.buyerEmail}</td>
    //         </tr>
    //         <tr>
    //           <th>Line items</th>
    //           <td>{jsonDisplay(invoice.lineItems)}</td>
    //         </tr>
    //         <tr>
    //           <th>Payment terms</th>
    //           <td>{invoice.paymentTerms}</td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>
    //   <nav className="rw-button-group">
    //     <Link
    //       to={routes.editInvoice({ id: invoice.id })}
    //       className="rw-button rw-button-blue"
    //     >
    //       Edit
    //     </Link>
    //     <button
    //       type="button"
    //       className="rw-button rw-button-red"
    //       onClick={() => onDeleteClick(invoice.id)}
    //     >
    //       Delete
    //     </button>
    //   </nav>
    // </>
  )
}

export default Invoice
