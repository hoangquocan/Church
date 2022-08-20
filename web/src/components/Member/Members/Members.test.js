import { render } from '@redwoodjs/testing/web'

import Members from './Members'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Members', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Members />)
    }).not.toThrow()
  })
})
