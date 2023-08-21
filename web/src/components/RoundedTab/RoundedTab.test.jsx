import { render } from '@redwoodjs/testing/web'

import RoundedTab from './RoundedTab'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RoundedTab', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RoundedTab />)
    }).not.toThrow()
  })
})
