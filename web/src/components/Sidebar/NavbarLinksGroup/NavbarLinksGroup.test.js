import { render } from '@redwoodjs/testing/web'

import NavbarLinksGroup from './NavbarLinksGroup'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('NavbarLinksGroup', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<NavbarLinksGroup />)
    }).not.toThrow()
  })
})
