import { render } from '@redwoodjs/testing/web'

import EditAvatar from './EditAvatar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EditAvatar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditAvatar />)
    }).not.toThrow()
  })
})
