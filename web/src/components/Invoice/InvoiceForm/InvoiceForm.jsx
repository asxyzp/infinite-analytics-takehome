import { Box, styled } from '@mui/material'

import {
  Form,
  FormError,
  FieldError,
  Label,
  DatetimeLocalField,
} from '@redwoodjs/forms'

import Button from 'src/components/Button/Button'
import Fieldset from 'src/components/Fieldset/Fieldset'
import Input from 'src/components/Input/Input'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const CustomBox = styled(Box)(({ theme }) => ({
  '&.MuiBox-root > form': {
    width: '35%',
    padding: '20px',
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}))

const InvoiceForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.invoice?.id)
  }

  return (
    <CustomBox>
      <Form onSubmit={onSubmit} error={props.error}>
        <Fieldset legend="Basic invoice details">
          <Input
            defaultValue={props.invoice?.title}
            label="Invoice title"
            size="small"
            margin="medium"
            fullWidth
            required
          />
          <Input
            defaultValue={props.invoice?.description}
            label="Invoice description"
            size="small"
            margin="medium"
            multiline={true}
            minRows={4}
            fullWidth
            required
          />
          <Input
            defaultValue={props.invoice?.paymentTerms}
            validation={{ required: true }}
            label="Terms of payment"
            size="small"
            margin="medium"
            fullWidth
            required
          />
          <Input
            label="Due date"
            type="datetime-local"
            defaultValue={formatDatetime(props.invoice?.dueAt)}
            validation={{ required: true }}
            size="small"
            margin="medium"
            fullWidth
            required
          />
        </Fieldset>

        <Fieldset legend="Seller's information">
          <Input
            label="Seller's name"
            defaultValue={props.invoice?.sellerName}
            size="small"
            margin="medium"
            fullWidth
            required
          />

          <Input
            defaultValue={props.invoice?.sellerAddress}
            label="Seller's address"
            multiline={true}
            minRows={4}
            size="small"
            margin="medium"
            fullWidth
          />

          <Input
            defaultValue={props.invoice?.sellerPhone}
            label="Seller's phone number"
            size="small"
            margin="medium"
            fullWidth
          />

          <Input
            type="email"
            label="Seller's email address"
            defaultValue={props.invoice?.sellerEmail}
            size="small"
            margin="medium"
            fullWidth
          />
        </Fieldset>

        <Fieldset legend="Buyer's information">
          <Input
            label="Buyer's name"
            defaultValue={props.invoice?.buyerName}
            validation={{ required: true }}
            size="small"
            margin="medium"
            fullWidth
            required
          />
          <Input
            defaultValue={props.invoice?.buyerAddress}
            label="Buyer's address"
            size="small"
            margin="medium"
            multiline={true}
            minRows={4}
            fullWidth
          />
          <Input
            defaultValue={props.invoice?.buyerPhone}
            label="Buyer's phone number"
            size="small"
            margin="medium"
            fullWidth
          />
          <Input
            type="email"
            defaultValue={props.invoice?.buyerEmail}
            size="small"
            margin="medium"
            label="Buyer's email address"
            fullWidth
          />
        </Fieldset>

        <Button
          disabled={props.loading}
          variant="contained"
          size="small"
          fullWidth
        >
          Submit
        </Button>
      </Form>
    </CustomBox>
  )
}

export default InvoiceForm
