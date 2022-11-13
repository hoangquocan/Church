import { render } from '@redwoodjs/testing/web'

import NewMultiActivities from './NewMultiActivities'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NewMultiActivities', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewMultiActivities />)
    }).not.toThrow()
  })
})
