import { render } from '@redwoodjs/testing/web'

import NavbarNested from './NavbarNested'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NavbarNested', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavbarNested />)
    }).not.toThrow()
  })
})
