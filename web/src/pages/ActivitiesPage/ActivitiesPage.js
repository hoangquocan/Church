import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const ActivitiesPage = () => {
  return (
    <>
      <MetaTags title="Activities" description="Activities page" />

      <h1>ActivitiesPage</h1>

      <p>
        Find me in
        <code>./web/src/pages/ActivitiesPage/ActivitiesPage.js</code>
      </p>

      <p>
        My default route is named
        <code>activities</code>, link to me with `
        <Link to={routes.activities()}>Activities</Link>`
      </p>
    </>
  )
}

export default ActivitiesPage
