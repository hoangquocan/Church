import { render } from '@redwoodjs/testing/web'

import MemberAttendance from './MemberAttendance'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MemberAttendance', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MemberAttendance />)
    }).not.toThrow()
  })
})
