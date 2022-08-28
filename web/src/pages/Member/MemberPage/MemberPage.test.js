import { render } from '@redwoodjs/testing/web'

import MemberPage from './MemberPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MemberPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MemberPage />)
    }).not.toThrow()
  })
})
