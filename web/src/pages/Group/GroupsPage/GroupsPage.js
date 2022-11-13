import { MetaTags } from '@redwoodjs/web'
import { useQuery } from '@redwoodjs/web'
import { useMediaQuery } from '@mantine/hooks'
import { Pagination, useMantineTheme } from '@mantine/core'
import { useState } from 'react'
import GroupsCell from 'src/components/Group/GroupsCell'

const QUERY = gql`
  query TotalGroups {
    totalGroups
  }
`

const GroupsPage = () => {
  const [activePage, setActivePage] = useState(1)
  const {data} = useQuery(QUERY)
  let totalGroups
  if(data) {
    totalGroups = data.totalGroups
  }
  const totalPage = Math.ceil(totalGroups / 12)
  const theme = useMantineTheme()
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)

  return (
    <>
      <MetaTags title="Groups" description="Members page" />
      <GroupsCell page={activePage}/>
      {totalPage > 1 && <Pagination
          position="center"
          page={activePage}
          onChange={setActivePage}
          total={totalPage}
          radius="lg"
          withEdges
          size={isMobile ? 'xs' : 'md'}
          mb={60}
          styles={{
            item: {
              fontWeight: '500',
            },
          }}
        />}
    </>
  )
}
export default GroupsPage
