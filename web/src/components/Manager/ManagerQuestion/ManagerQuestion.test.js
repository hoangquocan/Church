import { render } from '@redwoodjs/testing/web'

import ManagerQuestion from './ManagerQuestion'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ManagerQuestion', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ManagerQuestion />)
    }).not.toThrow()
  })
})
