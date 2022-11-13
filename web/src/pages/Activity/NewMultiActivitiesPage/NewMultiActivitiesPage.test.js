import { render } from '@redwoodjs/testing/web'

import NewMultiActivitiesPage from './NewMultiActivitiesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('NewMultiActivitiesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NewMultiActivitiesPage />)
    }).not.toThrow()
  })
})
