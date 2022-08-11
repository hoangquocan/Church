import { render } from '@redwoodjs/testing/web'

import AttendancePage from './AttendancePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AttendancePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AttendancePage />)
    }).not.toThrow()
  })
})
