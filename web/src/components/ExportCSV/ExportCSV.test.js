import { render } from '@redwoodjs/testing/web'

import ExportCsv from './ExportCsv'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ExportCsv', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ExportCsv />)
    }).not.toThrow()
  })
})
