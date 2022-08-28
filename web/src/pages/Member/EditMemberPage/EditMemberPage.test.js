import { render } from '@redwoodjs/testing/web'

import EditMemberPage from './EditMemberPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('EditMemberPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<EditMemberPage />)
    }).not.toThrow()
  })
})
