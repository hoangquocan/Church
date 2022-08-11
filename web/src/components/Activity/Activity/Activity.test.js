import { render } from '@redwoodjs/testing/web'

import Activity from './Activity'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Activity', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Activity />)
    }).not.toThrow()
  })
})
