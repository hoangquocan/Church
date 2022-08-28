import { render } from '@redwoodjs/testing/web'

import MemberBirthDate from './MemberBirthDate'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MemberBirthDate', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MemberBirthDate />)
    }).not.toThrow()
  })
})
