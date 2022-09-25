import { render } from '@redwoodjs/testing/web'

import SelectViewAttendanced from './SelectViewAttendanced'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SelectViewAttendanced', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SelectViewAttendanced />)
    }).not.toThrow()
  })
})
