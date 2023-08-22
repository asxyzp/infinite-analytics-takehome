import { useState } from 'react'

import {
  Carpenter,
  Fastfood,
  FormatPaint,
  Publish,
  TravelExplore,
  Visibility,
  Work,
} from '@mui/icons-material'
import { Box, Typography, styled } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'

import { Form } from '@redwoodjs/forms'

import Alert from 'src/components/Alert/Alert'
import Button from 'src/components/Button/Button'
import Fieldset from 'src/components/Fieldset/Fieldset'
import Input from 'src/components/Input/Input'
import Select from 'src/components/Select/Select'

import './invoiceForm.css'

// SETTING LOCAL VARIABLES
// SETTING DEFAULT VALUES
const defaultInvoice = {
  title: `invoice_${new Date().getDate()}_${new Date().getMonth()}_${new Date().getFullYear()}`,
  description: `Invoice generated on ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
  paymentTerms: `The due amount can be paid to the Random Bank of India's account no. RBOI${uuidv4()
    .split('-')[0]
    .toUpperCase()} or through the following link: https://random-payment-app.com/pay/${uuidv4()}`,
  dueAt: new Date(Date.now() + 864000000).toISOString(),
}
const defaultSeller = {
  name: 'Rajesh Kumar',
  phone: '+91 9876543210',
  email: 'rajesh.kumar@example.com',
  address: '45 Patel Nagar, New Delhi, India',
}
const defaultBuyer = {
  name: 'Priya Sharma',
  phone: '+91 8765432109',
  email: 'priya.sharma@example.com',
  address: '22 Gandhi Road, Mumbai, India',
}
const defaultLineItemFormState = {
  unit: 0,
  rate: 0,
  description: '',
}

// STORING LINE MENU ITEMS
const lineItemTypes = [
  {
    icon: <Work />,
    label: (
      <>
        <Typography variant="body1" sx={{ fontWeight: 'bolder' }}>
          Select a type
        </Typography>
        <Typography variant="body2">Labor, Material or Work-related</Typography>
      </>
    ),
    value: 'default',
  },
  {
    icon: <Carpenter />,
    label: (
      <>
        <Typography variant="body1" sx={{ fontWeight: 'bolder' }}>
          Labor
        </Typography>
        <Typography variant="body2">Hourly rate for manual labor</Typography>
      </>
    ),
    value: 'labor',
  },
  {
    icon: <FormatPaint />,
    label: (
      <>
        <Typography variant="body1" sx={{ fontWeight: 'bolder' }}>
          Material
        </Typography>
        <Typography variant="body2">Sale of physical items</Typography>
      </>
    ),
    value: 'material',
  },
  {
    icon: <Fastfood />,
    label: (
      <>
        <Typography variant="body1" sx={{ fontWeight: 'bolder' }}>
          Work-related
        </Typography>
        <Typography variant="body2">Meals, accomodations, etc</Typography>
      </>
    ),
    value: 'work',
  },
]

// METHODS
/**
 * @name formatDateTime
 * @description METHOD TO FORMAT DATE TIME
 * @param {*} value DATE TIME VALUE
 * @returns {String} FORMATTED DATE TIME VALUE
 */
const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

// INVOICE CONTAINER
const InvoiceFormContainer = styled(Box)(({ theme }) => ({
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
  '& .invoice-no-line-item-container': {
    padding: '5px 10px',
    borderRadius: '10px',
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${theme.palette.divider}`,
  },
}))

const InvoiceForm = (props) => {
  // SETTING LOCAL STATE
  const [lineItemType, setLineItemType] = useState('default')
  const [lineItemFormState, setLineItemFormState] = useState(
    defaultLineItemFormState
  )
  const [lineItemFormError, setLineItemFormError] = useState('')
  const [formState, setFormState] = useState({
    status: props.invoice ? props.invoice.status : 'OUTSTANDING',
    updateAt: new Date().toISOString(),
    dueAt: props.invoice ? props.invoice.dueAt : defaultInvoice.dueAt,
    issueAt: props.invoice ? props.invoice.issueAt : new Date().toISOString(),
    title: defaultInvoice.title,
    description: defaultInvoice.description,
    paymentTerms: props.invoice ? props.invoice.paymentTerms : '',
    buyerName: props.invoice ? props.invoice.buyerName : '',
    buyerPhone: props.invoice ? props.invoice.buyerPhone : '',
    buyerEmail: props.invoice ? props.invoice.buyerEmail : '',
    buyerAddress: props.invoice ? props.invoice.buyerAddress : '',
    sellerName: props.invoice ? props.invoice.sellerName : '',
    sellerPhone: props.invoice ? props.invoice.sellerPhone : '',
    sellerEmail: props.invoice ? props.invoice.sellerEmail : '',
    sellerAddress: props.invoice ? props.invoice.sellerAddress : '',
    lineItems: props.invoice ? props.invoice.lineItems : [],
  })

  /**
   * @name onSubmit
   * @description METHOD TO SUBMIT
   * @returns {undefined} undefined
   */
  const onSubmit = (event) => {
    props.onSave(formState, props?.invoice?.id)
  }

  /**
   * @name setSelectedField
   * @description METHOD TO SET SELECTED FIELD
   * @param {*} event EVENT OBJECT
   * @returns {undefined} undefined
   */
  const setLineItem = (event) => {
    setLineItemFormError('')
    setLineItemType(event.target.value)
    setLineItemFormState(defaultLineItemFormState)
  }

  // FORM METHODS
  /**
   * @name setInvoiceTitle
   * @description METHOD TO SET INVOICE TITLE
   * @param {*} event EVENT OBJECT
   * @returns {undefined} undefined
   */
  const setInvoiceTitle = (event) => {
    setFormState({ ...formState, title: event.target.value })
  }

  /**
   * @name setInvoiceDescription
   * @description METHOD TO SET INVOICE DESCRIPTION
   * @param {*} event EVENT OBJECT
   * @returns {undefined} undefined
   */
  const setInvoiceDescription = (event) => {
    setFormState({ ...formState, description: event.target.value })
  }

  /**
   * @name setDueAt
   * @description METHOD TO SET INVOICE DUE DATE
   * @param {*} event EVENT OBJECT
   * @returns {undefined} undefined
   */
  const setDueAt = (event) => {
    setFormState({
      ...formState,
      dueAt: new Date(event.target.value).toISOString(),
    })
  }

  /**
   * @name setPaymentTerms
   * @description METHOD TO SET INVOICE PAYMENT TERMS
   * @param {*} event EVENT OBJECT
   * @returns {undefined} undefined
   */
  const setPaymentTerms = (event) => {
    setFormState({ ...formState, paymentTerms: event.target.value })
  }

  /**
   * @name setSellerName
   * @description METHOD TO SET BUYER NAME
   * @param {*} event EVENT OBJECT
   * @returns {undefined} undefined
   */
  const setSellerName = (event) => {
    setFormState({ ...formState, sellerName: event.target.value })
  }

  /**
   * @name setSellerPhone
   * @description METHOD TO SET BUYER PHONE NO.
   * @param {*} event EVENT OBJECT
   * @returns {undefined} undefined
   */
  const setSellerPhone = (event) => {
    setFormState({ ...formState, sellerPhone: event.target.value })
  }

  /**
   * @name setSellerEmail
   * @description METHOD TO SET BUYER EMAIL ADDRESS
   * @param {*} event EVENT OBJECT
   * @returns {undefined} undefined
   */
  const setSellerEmail = (event) => {
    setFormState({ ...formState, sellerEmail: event.target.value })
  }

  /**
   * @name setSellerAddress
   * @description METHOD TO SET BUYER ADDRESS
   * @param {*} event EVENT OBJECT
   * @returns {undefined} undefined
   */
  const setSellerAddress = (event) => {
    setFormState({ ...formState, sellerAddress: event.target.value })
  }

  /**
   * @name setBuyerName
   * @description METHOD TO SET BUYER NAME
   * @param {*} event EVENT OBJECT
   * @returns {undefined} undefined
   */
  const setBuyerName = (event) => {
    setFormState({ ...formState, buyerName: event.target.value })
  }

  /**
   * @name setBuyerPhone
   * @description METHOD TO SET BUYER PHONE NO.
   * @param {*} event EVENT OBJECT
   * @returns {undefined} undefined
   */
  const setBuyerPhone = (event) => {
    setFormState({ ...formState, buyerPhone: event.target.value })
  }

  /**
   * @name setBuyerEmail
   * @description METHOD TO SET BUYER EMAIL ADDRESS
   * @param {*} event EVENT OBJECT
   * @returns {undefined} undefined
   */
  const setBuyerEmail = (event) => {
    setFormState({ ...formState, buyerEmail: event.target.value })
  }

  /**
   * @name setBuyerAddress
   * @description METHOD TO SET BUYER ADDRESS
   * @param {*} event EVENT OBJECT
   * @returns {undefined} undefined
   */
  const setBuyerAddress = (event) => {
    setFormState({ ...formState, buyerAddress: event.target.value })
  }

  /**
   * @name setLineItemDescription
   * @description METHOD TO SET LINE ITEM DESCRIPTION
   * @param {*} event EVENT OBJECT
   * @returns {undefined} undefined
   */
  const setLineItemDescription = (event) => {
    setLineItemFormState({
      ...lineItemFormState,
      description: event.target.value,
    })
  }

  /**
   * @name setLineItemUnit
   * @description METHOD TO SET LINE ITEM UNIT VALUE
   * @param {*} event EVENT OBJECT
   * @returns {undefined} undefined
   */
  const setLineItemUnit = (event) => {
    setLineItemFormState({
      ...lineItemFormState,
      unit: event.target.value,
    })
  }

  /**
   * @name setLineItemRate
   * @description METHOD TO SET LINE ITEM RATE VALUE
   * @param {*} event EVENT OBJECT
   * @returns {undefined} undefined
   */
  const setLineItemRate = (event) => {
    setLineItemFormState({
      ...lineItemFormState,
      rate: event.target.value,
    })
  }

  /**
   * @name createLineItem
   * @description METHOD TO CREATE A NEW LINE ITEM
   * @returns {undefined} undefined
   */
  const createLineItem = () => {
    setLineItemFormError('')
    const newLineItem = {
      id: uuidv4(),
      type: lineItemType,
      description: lineItemFormState.description,
      unit: lineItemFormState.unit,
      rate: lineItemFormState.rate,
    }
    if (
      lineItemFormState.description === '' ||
      lineItemFormState.unit <= 0 ||
      lineItemFormState.rate <= 0
    ) {
      setLineItemFormError('Please fill the necessary details')
    } else {
      setLineItemFormState({
        ...formState,
        lineItems: formState.lineItems.push(newLineItem),
      })
    }
  }

  console.log(formState)

  return (
    <InvoiceFormContainer className="invoice-form-container">
      <Form className="invoice-form" onSubmit={onSubmit}>
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
            margin="small"
            fullWidth
            required
            onChange={setInvoiceTitle}
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
            margin="small"
            multiline={true}
            minRows={1}
            fullWidth
            required
            onChange={setInvoiceDescription}
          />
          <Input
            label="Due date"
            type="datetime-local"
            defaultValue={formatDatetime(
              props.invoice ? props.invoice.dueAt : defaultInvoice.dueAt
            )}
            size="small"
            margin="small"
            fullWidth
            required
            onChange={setDueAt}
          />
          <Input
            type="text"
            defaultValue={props.invoice?.paymentTerms}
            placeholder={defaultInvoice.paymentTerms}
            label="Terms of payment"
            size="small"
            margin="small"
            multiline={true}
            minRows={4}
            fullWidth
            required
            onChange={setPaymentTerms}
          />
        </Fieldset>

        <Fieldset legend="Seller's information">
          <Input
            type="text"
            label="Seller's name"
            defaultValue={props.invoice?.sellerName}
            placeholder={defaultSeller.name}
            size="small"
            margin="small"
            fullWidth
            required
            onChange={setSellerName}
          />
          <Input
            type="tel"
            defaultValue={props.invoice?.sellerPhone}
            placeholder={defaultSeller.phone}
            label="Seller's phone number"
            size="small"
            margin="small"
            fullWidth
            onChange={setSellerPhone}
          />
          <Input
            type="email"
            label="Seller's email address"
            placeholder={defaultSeller.email}
            defaultValue={props.invoice?.sellerEmail}
            size="small"
            margin="small"
            fullWidth
            onChange={setSellerEmail}
          />
          <Input
            type="text"
            placeholder={defaultSeller.address}
            defaultValue={props.invoice?.sellerAddress}
            label="Seller's address"
            multiline={true}
            minRows={4}
            size="small"
            margin="small"
            fullWidth
            onChange={setSellerAddress}
          />
        </Fieldset>

        <Fieldset legend="Buyer's information">
          <Input
            type="text"
            label="Buyer's name"
            defaultValue={props.invoice?.buyerName}
            placeholder={defaultBuyer.name}
            size="small"
            margin="small"
            fullWidth
            required
            onChange={setBuyerName}
          />
          <Input
            type="tel"
            defaultValue={props.invoice?.buyerPhone}
            placeholder={defaultBuyer.phone}
            label="Buyer's phone number"
            size="small"
            margin="small"
            fullWidth
            onChange={setBuyerPhone}
          />
          <Input
            type="email"
            defaultValue={props.invoice?.buyerEmail}
            placeholder={defaultBuyer.email}
            size="small"
            margin="small"
            label="Buyer's email address"
            fullWidth
            onChange={setBuyerEmail}
          />
          <Input
            type="text"
            defaultValue={props.invoice?.buyerAddress}
            placeholder={defaultBuyer.address}
            label="Buyer's address"
            size="small"
            margin="small"
            multiline={true}
            minRows={4}
            fullWidth
            onChange={setBuyerAddress}
          />
        </Fieldset>

        <Fieldset legend="Line items">
          <Select
            fullWidth={true}
            margin="small"
            label="Select the type of line item"
            className="select-server"
            defaultValue="default"
            selectItems={lineItemTypes}
            onChange={setLineItem}
            // disabled={loading}
            value={lineItemType}
          />
          {lineItemType === 'labor' && (
            <>
              <Input
                type="text"
                label="Description"
                placeholder="Describe the work"
                size="small"
                margin="small"
                fullWidth
                required
                onChange={setLineItemDescription}
              />
              <Input
                type="number"
                label="Hourly rate (USD)"
                placeholder="20"
                min={0}
                size="small"
                margin="small"
                fullWidth
                required
                onChange={setLineItemRate}
              />
              <Input
                type="number"
                label="Number of hours"
                placeholder="15"
                min={0}
                size="small"
                margin="medium"
                fullWidth
                required
                onChange={setLineItemUnit}
              />
              <Button
                type="button"
                variant="outlined"
                size="small"
                className="invoice-submit-button"
                fullWidth
                startIcon={<Carpenter />}
                onClick={createLineItem}
              >
                Add labor item
              </Button>
              {lineItemFormError && (
                <Alert severity="error" sx={{ mt: '10px' }}>
                  {lineItemFormError}
                </Alert>
              )}
            </>
          )}
          {lineItemType === 'material' && (
            <>
              <Input
                type="text"
                label="Description"
                placeholder="Describe the purchased material"
                size="small"
                margin="small"
                fullWidth
                required
                onChange={setLineItemDescription}
              />
              <Input
                type="number"
                label="Price"
                placeholder="20"
                min={0}
                size="small"
                margin="small"
                fullWidth
                required
                onChange={setLineItemRate}
              />
              <Input
                type="number"
                label="Number of units"
                placeholder="15"
                min={0}
                size="small"
                margin="medium"
                fullWidth
                required
                onChange={setLineItemUnit}
              />
              <Button
                type="button"
                variant="outlined"
                size="small"
                className="invoice-submit-button"
                fullWidth
                startIcon={<FormatPaint />}
                onClick={createLineItem}
              >
                Add material item
              </Button>
              {lineItemFormError && (
                <Alert severity="error" sx={{ mt: '10px' }}>
                  {lineItemFormError}
                </Alert>
              )}
            </>
          )}
          {lineItemType === 'work' && (
            <>
              <Input
                type="text"
                label="Description"
                placeholder="Describe the work-related expense"
                size="small"
                margin="small"
                fullWidth
                required
                onChange={setLineItemDescription}
              />
              <Input
                type="number"
                label="Price"
                placeholder="20"
                min={0}
                size="small"
                margin="small"
                fullWidth
                required
                onChange={setLineItemRate}
              />
              <Input
                type="number"
                label="Number of units"
                placeholder="15"
                min={0}
                size="small"
                margin="medium"
                fullWidth
                required
                onChange={setLineItemUnit}
              />
              <Button
                type="button"
                variant="outlined"
                size="small"
                className="invoice-submit-button"
                fullWidth
                startIcon={<Fastfood />}
                onClick={createLineItem}
              >
                Add work item
              </Button>
              {lineItemFormError && (
                <Alert severity="error" sx={{ mt: '10px' }}>
                  {lineItemFormError}
                </Alert>
              )}
            </>
          )}
          {formState.lineItems.length === 0 && (
            <Box className="invoice-no-line-item-container">
              <TravelExplore fontSize="large" sx={{ mr: '5px' }} />
              <Typography variant="body1">No line items found</Typography>
              <Typography variant="body2">
                Select a value from the above field
              </Typography>
            </Box>
          )}
        </Fieldset>

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
    </InvoiceFormContainer>
  )
}

export default InvoiceForm
