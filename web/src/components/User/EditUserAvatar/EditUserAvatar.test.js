import { render } from '@redwoodjs/testing/web'

import EditUserAvatar from './EditUserAvatar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('EditUserAvatar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditUserAvatar />)
    }).not.toThrow()
  })
})
