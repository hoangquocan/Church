import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ContextCell from 'src/components/Context/ContextCell'
const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />

      <h1>HomePage</h1>

      <ContextCell />

    </>
  )
}

export default HomePage
