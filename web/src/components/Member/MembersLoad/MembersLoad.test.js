import { render } from '@redwoodjs/testing/web'

import MembersLoad from './MembersLoad'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MembersLoad', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MembersLoad />)
    }).not.toThrow()
  })
})
