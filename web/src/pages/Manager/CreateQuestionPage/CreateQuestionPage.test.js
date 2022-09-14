import { render } from '@redwoodjs/testing/web'

import CreateQuestionPage from './CreateQuestionPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CreateQuestionPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateQuestionPage />)
    }).not.toThrow()
  })
})
