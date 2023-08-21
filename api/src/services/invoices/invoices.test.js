import {
  invoices,
  invoice,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from './invoices'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('invoices', () => {
  scenario('returns all invoices', async (scenario) => {
    const result = await invoices()

    expect(result.length).toEqual(Object.keys(scenario.invoice).length)
  })

  scenario('returns a single invoice', async (scenario) => {
    const result = await invoice({ id: scenario.invoice.one.id })

    expect(result).toEqual(scenario.invoice.one)
  })

  scenario('creates a invoice', async () => {
    const result = await createInvoice({
      input: {
        updateAt: '2023-08-21T16:31:23.604Z',
        status: 'OUTSTANDING',
        title: 'String',
        description: 'String',
        dueAt: '2023-08-21T16:31:23.604Z',
        sellerName: 'String',
        buyerName: 'String',
        lineItems: { foo: 'bar' },
        paymentTerms: 'String',
      },
    })

    expect(result.updateAt).toEqual(new Date('2023-08-21T16:31:23.604Z'))
    expect(result.status).toEqual('OUTSTANDING')
    expect(result.title).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.dueAt).toEqual(new Date('2023-08-21T16:31:23.604Z'))
    expect(result.sellerName).toEqual('String')
    expect(result.buyerName).toEqual('String')
    expect(result.lineItems).toEqual({ foo: 'bar' })
    expect(result.paymentTerms).toEqual('String')
  })

  scenario('updates a invoice', async (scenario) => {
    const original = await invoice({ id: scenario.invoice.one.id })
    const result = await updateInvoice({
      id: original.id,
      input: { updateAt: '2023-08-22T16:31:23.604Z' },
    })

    expect(result.updateAt).toEqual(new Date('2023-08-22T16:31:23.604Z'))
  })

  scenario('deletes a invoice', async (scenario) => {
    const original = await deleteInvoice({
      id: scenario.invoice.one.id,
    })
    const result = await invoice({ id: original.id })

    expect(result).toEqual(null)
  })
})
