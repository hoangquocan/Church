import { render } from '@redwoodjs/testing/web'

import UpcomingActivities from './UpcomingActivities'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UpcomingActivities', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UpcomingActivities />)
    }).not.toThrow()
  })
})
