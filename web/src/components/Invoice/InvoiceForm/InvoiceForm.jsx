import {
  Form,
  FormError,
  FieldError,
  Label,
  RadioField,
  DatetimeLocalField,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const InvoiceForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.invoice?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="status"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Status
        </Label>

        <div className="rw-check-radio-items">
          <RadioField
            id="invoice-status-0"
            name="status"
            defaultValue="OUTSTANDING"
            defaultChecked={props.invoice?.status?.includes('OUTSTANDING')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />

          <div>Outstanding</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="invoice-status-1"
            name="status"
            defaultValue="PAID"
            defaultChecked={props.invoice?.status?.includes('PAID')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />

          <div>Paid</div>
        </div>

        <div className="rw-check-radio-items">
          <RadioField
            id="invoice-status-2"
            name="status"
            defaultValue="LATE"
            defaultChecked={props.invoice?.status?.includes('LATE')}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
          />

          <div>Late</div>
        </div>

        <FieldError name="status" className="rw-field-error" />

        <Label
          name="issueAt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Issue at
        </Label>

        <DatetimeLocalField
          name="issueAt"
          defaultValue={formatDatetime(props.invoice?.issueAt)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="issueAt" className="rw-field-error" />

        <Label
          name="dueAt"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Due at
        </Label>

        <DatetimeLocalField
          name="dueAt"
          defaultValue={formatDatetime(props.invoice?.dueAt)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="dueAt" className="rw-field-error" />

        <Label
          name="sellerName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Seller name
        </Label>

        <TextField
          name="sellerName"
          defaultValue={props.invoice?.sellerName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="sellerName" className="rw-field-error" />

        <Label
          name="sellerAddress"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Seller address
        </Label>

        <TextField
          name="sellerAddress"
          defaultValue={props.invoice?.sellerAddress}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="sellerAddress" className="rw-field-error" />

        <Label
          name="sellerPhone"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Seller phone
        </Label>

        <TextField
          name="sellerPhone"
          defaultValue={props.invoice?.sellerPhone}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="sellerPhone" className="rw-field-error" />

        <Label
          name="sellerEmail"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Seller email
        </Label>

        <TextField
          name="sellerEmail"
          defaultValue={props.invoice?.sellerEmail}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="sellerEmail" className="rw-field-error" />

        <Label
          name="buyerName"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Buyer name
        </Label>

        <TextField
          name="buyerName"
          defaultValue={props.invoice?.buyerName}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="buyerName" className="rw-field-error" />

        <Label
          name="buyerAddress"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Buyer address
        </Label>

        <TextField
          name="buyerAddress"
          defaultValue={props.invoice?.buyerAddress}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="buyerAddress" className="rw-field-error" />

        <Label
          name="buyerPhone"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Buyer phone
        </Label>

        <TextField
          name="buyerPhone"
          defaultValue={props.invoice?.buyerPhone}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="buyerPhone" className="rw-field-error" />

        <Label
          name="buyerEmail"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Buyer email
        </Label>

        <TextField
          name="buyerEmail"
          defaultValue={props.invoice?.buyerEmail}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="buyerEmail" className="rw-field-error" />

        <Label
          name="lineItems"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Line items
        </Label>

        <TextAreaField
          name="lineItems"
          defaultValue={JSON.stringify(props.invoice?.lineItems)}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ valueAsJSON: true, required: true }}
        />

        <FieldError name="lineItems" className="rw-field-error" />

        <Label
          name="paymentTerms"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Payment terms
        </Label>

        <TextField
          name="paymentTerms"
          defaultValue={props.invoice?.paymentTerms}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="paymentTerms" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default InvoiceForm
