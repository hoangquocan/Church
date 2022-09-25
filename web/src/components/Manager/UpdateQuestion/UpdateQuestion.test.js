import { render } from '@redwoodjs/testing/web'

import UpdateQuestion from './UpdateQuestion'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UpdateQuestion', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UpdateQuestion />)
    }).not.toThrow()
  })
})
