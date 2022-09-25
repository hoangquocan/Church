import { render } from '@redwoodjs/testing/web'

import ViewReportGroup from './ViewReportGroup'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ViewReportGroup', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ViewReportGroup />)
    }).not.toThrow()
  })
})
