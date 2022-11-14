import { useQuery } from '@redwoodjs/web'
import { memo, useState } from 'react'
import { Loader } from '@mantine/core'
import {
  HoverCard,
  Avatar,
  Text,
  Group,
  Stack,
  Image,
  Modal,
} from '@mantine/core'
// import Autoplay from 'embla-carousel-autoplay'
import { Carousel } from '@mantine/carousel'

import Member from '../Member/Member'
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
  const [openProfile, setOpenProfile] = useState(false)
  const [member, setMember] = useState()
  const { loading, error, data } = useQuery(QUERY)
  if (loading)
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Loader variant="oval" size="md" color="blue" />
      </div>
    )
  if (error) return <h2 className="text-center">Please Log In To View</h2>

  const members = data.members
  const currentMonth = new Date().getMonth() + 1

  const result = members.filter((member) => {
    return new Date(member.birthDate).getMonth() + 1 == currentMonth
  })

  const images = result.map((member) => (
    <Carousel.Slide key={member.id}>
      <Group position="center">
        <HoverCard
          zIndex={2}
          position="bottom"
          width={300}
          shadow="rgba(0, 0, 0, 0.83) 0px 3px 6px"
          withArrow
          openDelay={100}
          closeDelay={100}
        >
          <HoverCard.Target>
            <Image
              src={member.urlAvatar}
              radius="5px"
              height={180}
              width={120}
              fit="contain"
              withPlaceholder
              placeholder={<Avatar radius="50%" size="xl" color="pink" />}
              styles={() => ({
                imageWrapper: {
                  boxShadow: '0px 1px 3px 0px #EC407A, #EC407A 0px 0px 0px 1px',
                  borderRadius: '5px',
                },
                placeholder: {
                  background: '#ffdeeb',
                },
              })}
            />
          </HoverCard.Target>
          <HoverCard.Dropdown onClick={() => {
              setMember(member)
              setOpenProfile(true)
            }}>
            <Group spacing="6px">
              <Avatar
                mr={10}
                ml={6}
                src={member.urlAvatar}
                radius="50%"
                size="lg"
                color="pink"
                styles={() => ({
                  root: {
                    boxShadow: ' 0 2px 4px 2px #FF99AA',
                  },
                })}
              />
              <Stack spacing={1}>
                <Text size="md" weight={500} color="#A61E4D">
                  {member.name}
                </Text>
                <span>{member.phoneNumber}</span>
                <Text size="md">
                  {new Date(member.birthDate).toLocaleDateString('pt-BR')}
                </Text>
              </Stack>
            </Group>
          </HoverCard.Dropdown>
        </HoverCard>

      </Group>
    </Carousel.Slide>
  ))
console.log(images)
  return (
    <>
      {images.length > 0 ?  <div className="member-birthdate">
        <h2 style={{ fontFamily: 'Qwigley', fontWeight: '400' }}>
          BirthDays Of The Month
        </h2>
        <>

            <Carousel
              styles={{
                root: {
                  margin: '0px auto',
                  paddingTop: '5px',
                  width: '50%',
                  '@media (max-width: 1366px)': { width: '80%' },
                  '@media (max-width: 1024px)': { width: '100%' },
                  ':hover': {
                    cursor: 'pointer',
                  },
                },
                control: {
                  backgroundColor: '#fff',
                  color: '#000',
                  marginTop: -110,
                  '@media (max-width: 480px)': { marginTop: -90 },
                },
                indicator: {
                  marginBottom: 84,
                },
              }}
              withIndicators
              height="300px"
              slideSize="25%"
              slideGap="md"
              align="center"
              controlsOffset="xs"
              slidesToScroll={3}
            >
              {images}
            </Carousel>
        </>
        <Modal
            opened={openProfile}
            onClose={() => setOpenProfile(false)}
            overlayColor="transparent"
            zIndex={101}
            styles={() => ({
              modal: {
                marginTop: '20px',
                backgroundColor: 'rgba(0, 0, 0, .8)',
                '@media(min-width: 1024px)': {
                  marginTop: '50px',
                  marginLeft: '300px',
                  width: '700px',
                },
              },
              close: {
                backgroundColor: '#f2f2f2',
                marginRight: 10,
                width: 32,
                height: 32,
                borderRadius: '50%',
              },
            })}
          >
            <Member member={member} />
          </Modal>
      </div>
     : null}
    </>
  )
}

export default memo(MemberBirthDate)
