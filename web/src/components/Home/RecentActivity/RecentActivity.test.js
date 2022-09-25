import { render } from '@redwoodjs/testing/web'

import RecentActivity from './RecentActivity'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('RecentActivity', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RecentActivity />)
    }).not.toThrow()
  })
})
