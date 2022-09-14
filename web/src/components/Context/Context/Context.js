import { createContext } from 'react'
import { QUERY } from 'src/components/Group/GroupsCell'
import { useQuery } from '@redwoodjs/web'
import { Loader } from '@mantine/core'

const GroupsContext = createContext()

const ContextProvider = ({ children }) => {
  // const { loading, error, data } = useQuery(QUERY)
  // if (loading) return <div style={{ textAlign: 'center'}}><Loader variant="oval" size="md" color='dark'/></div>
  // if (error) return `Error! ${error.message}`
  // const groups = data.groups

  return (
    <GroupsContext.Provider value={groups}>{children}</GroupsContext.Provider>
  )
}

export { GroupsContext, ContextProvider }
