import { render } from '@redwoodjs/testing/web'

import InvoiceView from './InvoiceView'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InvoiceView', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InvoiceView />)
    }).not.toThrow()
  })
})
