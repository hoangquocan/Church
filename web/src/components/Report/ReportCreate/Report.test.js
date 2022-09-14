import { render } from '@redwoodjs/testing/web'

import Report from './ReportCreate'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Report', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Report />)
    }).not.toThrow()
  })
})
