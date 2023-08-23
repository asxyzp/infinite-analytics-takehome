import { render } from '@redwoodjs/testing/web'

import InvoiceModal from './InvoiceModal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('InvoiceModal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<InvoiceModal />)
    }).not.toThrow()
  })
})
