import { render } from '@redwoodjs/testing/web'

import GroupAddMem from './GroupAddMem'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GroupAddMem', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GroupAddMem />)
    }).not.toThrow()
  })
})
