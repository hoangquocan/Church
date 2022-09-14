import { render } from '@redwoodjs/testing/web'

import SetRoles from './SetRoles'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SetRoles', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SetRoles />)
    }).not.toThrow()
  })
})
