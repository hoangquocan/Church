import { render } from '@redwoodjs/testing/web'

import Activities from './Activities'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Activities', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Activities />)
    }).not.toThrow()
  })
})
