import { render } from '@redwoodjs/testing/web'

import ExportSurveyPage from './ExportSurveyPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ExportSurveyPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ExportSurveyPage />)
    }).not.toThrow()
  })
})
