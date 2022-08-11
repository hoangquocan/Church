import { render } from '@redwoodjs/testing/web'

import NewActivityPage from './NewActivityPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NewActivityPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewActivityPage />)
    }).not.toThrow()
  })
})
