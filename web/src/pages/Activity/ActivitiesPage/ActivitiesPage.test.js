import { render } from '@redwoodjs/testing/web'

import ActivitiesPage from './ActivitiesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ActivitiesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ActivitiesPage />)
    }).not.toThrow()
  })
})
