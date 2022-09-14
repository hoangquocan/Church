import { render } from '@redwoodjs/testing/web'

import CreateQuestion from './CreateQuestion'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CreateQuestion', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateQuestion />)
    }).not.toThrow()
  })
})
