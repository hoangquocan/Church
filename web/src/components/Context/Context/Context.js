import { createContext, useRef } from 'react'
import { useAuth } from '@redwoodjs/auth'
import { useQuery } from '@redwoodjs/web'

const RefContext = createContext()
const GROUPS_QUERY = gql`
  query GROUPS {
    groups {
      id
      name
      leader {
        id
        name
        email
        avatar
      }
      userId
      members {
        id
        name
      }
      createdAt
    }
  }
`
const ContextProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const containerRef = useRef()
  const sidebarRef = useRef()
  const { loading, error, data } = useQuery(GROUPS_QUERY, {
    skip: !isAuthenticated,
  })
  let groups = []
  if (data) {
    groups = data.groups
  }

  const value = {
    containerRef,
    sidebarRef,
    groups,
  }
  return <RefContext.Provider value={value}>{children}</RefContext.Provider>
}

export { RefContext, ContextProvider }
