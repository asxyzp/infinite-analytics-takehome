import { render } from '@redwoodjs/testing/web'

import RoundedTabs from './RoundedTabs'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RoundedTabs', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RoundedTabs />)
    }).not.toThrow()
  })
})
