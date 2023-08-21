import { render } from '@redwoodjs/testing/web'

import Fieldset from './Fieldset'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Fieldset', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Fieldset />)
    }).not.toThrow()
  })
})
