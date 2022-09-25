import { render } from '@redwoodjs/testing/web'

import SetRoleUserPage from './SetRoleUserPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SetRoleUserPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SetRoleUserPage />)
    }).not.toThrow()
  })
})
