import { render } from '@redwoodjs/testing/web'

import Group from './Group'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Group', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Group />)
    }).not.toThrow()
  })
})
