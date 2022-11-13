import { render } from '@redwoodjs/testing/web'

import ManagerQuarter from './ManagerQuarter'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ManagerQuarter', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ManagerQuarter />)
    }).not.toThrow()
  })
})
