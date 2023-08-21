import { Publish, Visibility } from '@mui/icons-material'
import { Box, Typography, styled } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'

import { Form } from '@redwoodjs/forms'

import Alert from 'src/components/Alert/Alert'
import Button from 'src/components/Button/Button'
import Fieldset from 'src/components/Fieldset/Fieldset'
import Input from 'src/components/Input/Input'

import './invoiceForm.css'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const CustomBox = styled(Box)(({ theme }) => ({
  '&.invoice-form-container': {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    overflow: 'hidden',
  },
  '& .invoice-form': {
    padding: '10px 20px',
    height: '100%',
    overflow: 'hidden',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  '& .form-title': {
    fontWeight: 'bold',
    marginBottom: '-5px',
  },
  '& .form-description': {
    marginBottom: '10px',
  },
  '& .invoice-form-buttons': {
    background: theme.palette.background.default,
  },
  '& .invoice-container': {
    background:
      theme.palette.mode === 'light'
        ? theme.palette.grey['main']
        : theme.palette.background.paper,
  },
  '& .invoice-form-alert': {
    marginTop: '10px',
  },
}))

const InvoiceForm = (props) => {
  // SETTING LOCAL VARIABLES
  // SETTING DEFAULT VALUES
  const defaultInvoice = {
    title: `invoice_${new Date().getDate()}_${new Date().getMonth()}_${new Date().getFullYear()}`,
    description: `Invoice generated on ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
    paymentTerms: `The due amount can be paid to the Random Bank of India's account no. RBOI${uuidv4()
      .split('-')[0]
      .toUpperCase()} or through the following link: https://random-payment-app.com/pay/${uuidv4()}`,
    dueDate: new Date(Date.now() + 864000000).toISOString(),
  }
  const defaultSeller = {
    name: 'Rajesh Kumar',
    email: '+91 9876543210',
    phone: 'rajesh.kumar@example.com',
    address: '45 Patel Nagar, New Delhi, India',
  }
  const defaultBuyer = {
    name: 'Priya Sharma',
    email: '+91 8765432109',
    phone: 'priya.sharma@example.com',
    address: '22 Gandhi Road, Mumbai, India',
  }

  const onSubmit = (data) => {
    props.onSave(data, props?.invoice?.id)
  }

  return (
    <CustomBox className="invoice-form-container">
      <Form className="invoice-form" onSubmit={onSubmit} error={props.error}>
        <Typography variant="h6" className="form-title">
          Generate invoice
        </Typography>
        <Typography variant="body2" className="form-description">
          Add details to create a new invoice
        </Typography>

        <Fieldset legend="Basic invoice details">
          <Input
            type="text"
            defaultValue={
              props.invoice ? props.invoice.title : defaultInvoice.title
            }
            label="Invoice title"
            size="small"
            margin="medium"
            fullWidth
            required
          />
          <Input
            type="text"
            defaultValue={
              props.invoice
                ? props.invoice.description
                : defaultInvoice.description
            }
            label="Invoice description"
            size="small"
            margin="medium"
            multiline={true}
            minRows={1}
            fullWidth
            required
          />
          <Input
            label="Due date"
            type="datetime-local"
            defaultValue={formatDatetime(
              props.invoice ? props.invoice.dueAt : defaultInvoice.dueDate
            )}
            validation={{ required: true }}
            size="small"
            margin="medium"
            fullWidth
            required
          />
          <Input
            type="text"
            defaultValue={props.invoice?.paymentTerms}
            placeholder={defaultInvoice.paymentTerms}
            label="Terms of payment"
            size="small"
            margin="medium"
            multiline={true}
            minRows={4}
            fullWidth
            required
          />
        </Fieldset>

        <Fieldset legend="Seller's information">
          <Input
            type="text"
            label="Seller's name"
            defaultValue={props.invoice?.sellerName}
            placeholder={defaultSeller.name}
            size="small"
            margin="medium"
            fullWidth
            required
          />
          <Input
            type="tel"
            defaultValue={props.invoice?.sellerPhone}
            placeholder={defaultSeller.phone}
            label="Seller's phone number"
            size="small"
            margin="medium"
            fullWidth
          />
          <Input
            type="email"
            label="Seller's email address"
            placeholder={defaultSeller.email}
            defaultValue={props.invoice?.sellerEmail}
            size="small"
            margin="medium"
            fullWidth
          />
          <Input
            type="text"
            placeholder={defaultSeller.address}
            defaultValue={props.invoice?.sellerAddress}
            label="Seller's address"
            multiline={true}
            minRows={4}
            size="small"
            margin="medium"
            fullWidth
          />
        </Fieldset>

        <Fieldset legend="Buyer's information">
          <Input
            type="text"
            label="Buyer's name"
            defaultValue={props.invoice?.buyerName}
            placeholder={defaultBuyer.name}
            validation={{ required: true }}
            size="small"
            margin="medium"
            fullWidth
            required
          />
          <Input
            type="tel"
            defaultValue={props.invoice?.buyerPhone}
            placeholder={defaultBuyer.phone}
            label="Buyer's phone number"
            size="small"
            margin="medium"
            fullWidth
          />
          <Input
            type="email"
            defaultValue={props.invoice?.buyerEmail}
            placeholder={defaultBuyer.email}
            size="small"
            margin="medium"
            label="Buyer's email address"
            fullWidth
          />
          <Input
            type="text"
            defaultValue={props.invoice?.buyerAddress}
            placeholder={defaultBuyer.address}
            label="Buyer's address"
            size="small"
            margin="medium"
            multiline={true}
            minRows={4}
            fullWidth
          />
        </Fieldset>

        <Fieldset legend="Line items"></Fieldset>

        <Box className="invoice-form-buttons">
          <Button
            disabled={props.loading}
            variant="outlined"
            size="small"
            margin="medium"
            className="invoice-view-button"
            fullWidth
            startIcon={<Visibility />}
          >
            View
          </Button>
          <Button
            type="submit"
            disabled={props.loading}
            variant="contained"
            size="small"
            className="invoice-submit-button"
            fullWidth
            startIcon={<Publish />}
          >
            Submit
          </Button>
          {props.error && (
            <Box className="invoice-form-alert">
              <Alert severity="error">{props.error?.message}</Alert>
            </Box>
          )}
        </Box>
      </Form>
      <Box className="invoice-container"></Box>
    </CustomBox>
  )
}

export default InvoiceForm
