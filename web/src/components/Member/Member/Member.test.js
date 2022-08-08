import { render } from '@redwoodjs/testing/web'

import Member from './Member'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Member', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Member />)
    }).not.toThrow()
  })
})
