import { render } from '@redwoodjs/testing/web'

import MembersPage from './MembersPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MembersPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MembersPage />)
    }).not.toThrow()
  })
})
