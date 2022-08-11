import { render } from '@redwoodjs/testing/web'

import ActivityForm from './ActivityForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ActivityForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ActivityForm />)
    }).not.toThrow()
  })
})
