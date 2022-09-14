import { render } from '@redwoodjs/testing/web'

import Reports from './ReportChart'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Reports', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Reports />)
    }).not.toThrow()
  })
})
