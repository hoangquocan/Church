import { render } from '@redwoodjs/testing/web'

import Groups from './Groups'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Groups', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Groups />)
    }).not.toThrow()
  })
})
