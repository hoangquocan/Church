import { render } from '@redwoodjs/testing/web'

import ActivitiesOutOfDate from './ActivitiesOutOfDate'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ActivitiesOutOfDate', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ActivitiesOutOfDate />)
    }).not.toThrow()
  })
})
