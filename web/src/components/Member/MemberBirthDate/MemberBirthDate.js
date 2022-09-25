import { useQuery } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'

import { Loader } from '@mantine/core'
import { HoverCard, Avatar, Text, Group, Stack } from '@mantine/core'
// import Autoplay from 'embla-carousel-autoplay'
import { Carousel } from '@mantine/carousel'

import './MemberBirthDate.scss'

const QUERY = gql`
  query MemberBirthDateQuery {
    members {
      id
      name
      birthDate
      address
      phoneNumber
      email
      urlAvatar
      group {
        name
      }
      createdAt
    }
  }
`
const MemberBirthDate = () => {
  const { loading, error, data } = useQuery(QUERY)
  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px'}}><Loader variant="oval" size="md" color='blue'/></div>
  if (error) return `Error! ${error.message}`

  const members = data.members
  const currentMonth = new Date().getMonth() + 1

  const result = members.filter((member) => {
    return new Date(member.birthDate).getMonth() + 1 == currentMonth
  })

  const thumbnail = (url) => {
    const parts = url.split('/')
    parts.splice(3, 0, 'resize=width:100')
    return parts.join('/')
  }

  const images = result.map((member) => (
    <Carousel.Slide key={member.id}>
      <Group position="center">
        <HoverCard
          zIndex={9999}
          position="bottom"
          width={280}
          shadow="lg"
          withArrow
          openDelay={100}
          closeDelay={100}
        >
          <HoverCard.Target>
            {member.urlAvatar ? (
              <img src={thumbnail(member.urlAvatar)} alt="Avatar" />
            ) : (
              <ion-icon title="" name="person-outline"></ion-icon>
            )}
          </HoverCard.Target>
          <HoverCard.Dropdown>
            <Group>
              <Avatar src={thumbnail(member.urlAvatar)} radius="50%" size="xl" />
              <Stack spacing={1}>
                <Text size="sm" weight={700} sx={{ lineHeight: 1 }}>
                  {member.name}
                </Text>
                <Link to={routes.member({ id: member.id })}>
                  <span>{member.phoneNumber}</span>
                </Link>
              </Stack>
            </Group>

            <Text size="sm" mt={5}>
              {new Date(member.birthDate).toLocaleDateString('sv')}
            </Text>

            {/* <Group mt="md" spacing="xl">
              <Text size="sm">
                <b>0</b> Following
              </Text>
              <Text size="sm">
                <b>1,174</b> Followers
              </Text>
            </Group> */}
          </HoverCard.Dropdown>
        </HoverCard>
      </Group>
    </Carousel.Slide>
  ))

  return (
    <div className="member-birthdate">
      <h2 style={{ fontFamily: 'Qwigley', fontWeight: '400' }}>BirthDays Of The Month</h2>

      {images.length > 0 ? (
        <Carousel
          styles={{
            root: {
              margin: '0 auto',
              width: '50%',
              '@media (max-width: 1366px)': { width: '80%' },
              '@media (max-width: 1024px)': { width: '100%' },
              '@media (max-width: 480px)': { height: 240 },
            },
            control: {
              backgroundColor: '#fff',
              color: '#000',
              marginTop: -120,
              '@media (max-width: 480px)': { marginTop: -90 },
            },
            indicator: { marginBottom: 100,
              '@media (min-width: 480px)': { marginBottom: 135 },
             },
          }}
          withIndicators
          height={360}
          slideSize="22%"
          slideGap="md"
          align="center"
          controlsOffset="xs"
          slidesToScroll={4}
        >
          {images}
        </Carousel>
      ) : (
        <h3 className="text-center">
          Don't Have Any Member Has BirthDay On This Month
        </h3>
      )}
    </div>
  )
}

export default MemberBirthDate
