import { render } from '@redwoodjs/testing/web'

import AttendancedPage from './AttendancedPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AttendancedPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AttendancedPage />)
    }).not.toThrow()
  })
})
