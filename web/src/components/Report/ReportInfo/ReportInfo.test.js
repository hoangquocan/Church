import { render } from '@redwoodjs/testing/web'

import ReportInfo from './ReportInfo'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ReportInfo', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ReportInfo />)
    }).not.toThrow()
  })
})
