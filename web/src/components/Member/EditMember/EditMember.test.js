import { render } from '@redwoodjs/testing/web'

import EditMember from './EditMember'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EditMember', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditMember />)
    }).not.toThrow()
  })
})
