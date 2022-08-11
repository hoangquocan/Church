import { render } from '@redwoodjs/testing/web'

import ActivityNotAttenPage from './ActivityNotAttenPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ActivityNotAttenPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ActivityNotAttenPage />)
    }).not.toThrow()
  })
})
