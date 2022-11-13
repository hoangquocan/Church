import { render } from '@redwoodjs/testing/web'

import ImportFile from './ImportFile'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ImportFile', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ImportFile />)
    }).not.toThrow()
  })
})
