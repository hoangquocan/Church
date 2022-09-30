import { render } from '@redwoodjs/testing/web'

import ConvertEnglish from './ConvertEnglish'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ConvertEnglish', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ConvertEnglish />)
    }).not.toThrow()
  })
})
