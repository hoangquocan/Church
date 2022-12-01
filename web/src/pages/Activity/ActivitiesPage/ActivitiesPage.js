import { useState } from 'react'
import { Pagination, useMantineTheme } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useQuery } from '@redwoodjs/web'
import { MetaTags } from '@redwoodjs/web'
import ActivitiesPageCell from 'src/components/Activity/ActivitiesPageCell'

const QUERY = gql`
  query TotalActivities {
    totalActivities
  }
`
const ActivitiesPage = () => {
  const [activePage, setActivePage] = useState(1)

  const { data } = useQuery(QUERY)
  let totalActivities
  if (data) {
    totalActivities = data.totalActivities
  }
  const totalPage = Math.ceil(totalActivities / 12)
  const theme = useMantineTheme()
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)
  return (
    <>
      <MetaTags title="Activities" />
      <ActivitiesPageCell page={activePage} />
      <Pagination
        position="center"
        page={activePage}
        onChange={setActivePage}
        total={totalPage}
        radius="lg"
        withEdges
        size={isMobile ? 'xs' : 'md'}
        mb={80}
        styles={{
          item: {
            fontWeight: '500',
          },
        }}
      />
    </>
  )
}

export default ActivitiesPage
