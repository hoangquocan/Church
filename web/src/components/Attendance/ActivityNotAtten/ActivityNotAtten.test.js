import { render } from '@redwoodjs/testing/web'

import ActivityNotAtten from './ActivityNotAtten'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ActivityNotAtten', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ActivityNotAtten />)
    }).not.toThrow()
  })
})
