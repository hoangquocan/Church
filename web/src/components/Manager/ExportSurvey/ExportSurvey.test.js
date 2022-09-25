import { render } from '@redwoodjs/testing/web'

import ExportSurvey from './ExportSurvey'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ExportSurvey', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ExportSurvey />)
    }).not.toThrow()
  })
})
