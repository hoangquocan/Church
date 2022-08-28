import { useQuery } from '@redwoodjs/web'
// import { useRef } from 'react'
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
  if (loading) return <h1 className="text-center">Loading...</h1>
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
      {member.urlAvatar ? (
        <img src={thumbnail(member.urlAvatar)} alt="Avatar" />
      ) : (
        <ion-icon name="person-outline"></ion-icon>
      )}
    </Carousel.Slide>
  ))

  return (
    <div className="member-birthdate">
      <h6 style={{color: '#fff'}}>BirthDays Of The Month</h6>

      {(images.length > 0 )? (
        <Carousel
          styles={{
            root: {
              margin: '0 auto',
              width: '50%',
              height: 220,
              '@media (max-width: 1366px)': { width: '80%' },
              '@media (max-width: 1024px)': { width: '100%' },
              // '@media (max-width: 768px)': { height: 175 },
              '@media (max-width: 480px)': { height: 140 },
            },
            control: { backgroundColor: '#E3FAFC', color: '#000' },
            indicator: { backgroundColor: '#fff' },
          }}
          withIndicators
          height={220}
          slideSize="22%"
          slideGap="md"
          align="center"
          controlsOffset="xs"
          slidesToScroll={4}
        >
          {images}
        </Carousel>
      ) : <h5 className='text-center'>Don't Have Any Member Has BirthDay On This Month</h5>}
    </div>
  )
}

export default MemberBirthDate
