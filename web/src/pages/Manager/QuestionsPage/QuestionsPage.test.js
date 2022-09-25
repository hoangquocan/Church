import { render } from '@redwoodjs/testing/web'

import QuestionsPage from './QuestionsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('QuestionsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<QuestionsPage />)
    }).not.toThrow()
  })
})
