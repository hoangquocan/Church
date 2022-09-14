import { render } from '@redwoodjs/testing/web'

import MenuUser from './MenuUser'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MenuUser', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MenuUser />)
    }).not.toThrow()
  })
})
