import { render } from '@redwoodjs/testing/web'

import ViewAttendance from './ViewAttendanced'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ViewAttendance', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ViewAttendance />)
    }).not.toThrow()
  })
})
