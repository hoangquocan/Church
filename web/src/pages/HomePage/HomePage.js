import { MetaTags } from '@redwoodjs/web'
import Home from 'src/components/Home/Home'
import MemberBirthDate from 'src/components/Member/MemberBirthDate/MemberBirthDate'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" />
      <MemberBirthDate />
      <Home />
    </>
  )
}

export default HomePage
