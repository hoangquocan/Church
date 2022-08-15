import { render } from '@redwoodjs/testing/web'

import MemberPagination from './MemberPagination'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MemberPagination', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MemberPagination />)
    }).not.toThrow()
  })
})
