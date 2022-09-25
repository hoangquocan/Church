import { render } from '@redwoodjs/testing/web'

import ManagerUsers from './ManagerUsers'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ManagerUsers', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ManagerUsers />)
    }).not.toThrow()
  })
})
