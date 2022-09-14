import { render } from '@redwoodjs/testing/web'

import ReportCreatePage from './ReportCreatePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ReportCreatePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReportCreatePage />)
    }).not.toThrow()
  })
})
