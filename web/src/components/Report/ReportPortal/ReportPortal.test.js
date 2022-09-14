import { render } from '@redwoodjs/testing/web'

import ReportPortal from './ReportPortal'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ReportPortal', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReportPortal />)
    }).not.toThrow()
  })
})
