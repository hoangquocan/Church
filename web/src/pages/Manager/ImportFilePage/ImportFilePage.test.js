import { render } from '@redwoodjs/testing/web'

import ImportFilePage from './ImportFilePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ImportFilePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ImportFilePage />)
    }).not.toThrow()
  })
})
