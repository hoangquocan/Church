import { createContext, useRef } from 'react'
import { QUERY as GROUPS_QUERY } from 'src/components/Group/GroupsCell'
import { useAuth } from '@redwoodjs/auth'
import { useQuery } from '@redwoodjs/web'
import { Loader } from '@mantine/core'

const RefContext = createContext()

const ContextProvider = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const containerRef = useRef()
  const sidebarRef = useRef()
  const { loading, error, data } = useQuery(GROUPS_QUERY, {
    skip: !isAuthenticated,
  })
  // if (loading)
  //   return (
  //     <div style={{ textAlign: 'center' }}>
  //       <Loader variant="oval" size="md" color="blue" />
  //     </div>
  //   )
  // if (error) return `Error! ${error.message}`
  let groups = []
  if (data) {
    groups = data.groups
  }

  const value = {
    containerRef,
    sidebarRef,
    groups,
  }
  // console.log(groups)
  return <RefContext.Provider value={value}>{children}</RefContext.Provider>
}

export { RefContext, ContextProvider }
