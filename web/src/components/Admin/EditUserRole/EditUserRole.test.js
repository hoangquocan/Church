import { render } from '@redwoodjs/testing/web'

import EditUserRole from './EditUserRole'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EditUserRole', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditUserRole />)
    }).not.toThrow()
  })
})
