import { render } from '@redwoodjs/testing/web'

import ReportInfoPage from './ReportInfoPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ReportInfoPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReportInfoPage />)
    }).not.toThrow()
  })
})
