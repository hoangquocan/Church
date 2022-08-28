// import { Link, routes, navigate } from '@redwoodjs/router'
// import './MemberPagination.scss'
// import { Pagination } from '@mantine/core'
// import { useState, useEffect } from 'react';

// const MemberPagination = ({ members }) => {
//   // const MEMBERS_PER_PAGE = 5
//   const totalPage = Math.ceil(members.length / 5)
//   const [activePage, setActivePage] = useState(1);
//   // const items = []

//   // for (let i = 0; i < Math.ceil(count / MEMBERS_PER_PAGE); i++) {
//   //   items.push(
//   //     <li key={i}>
//   //       <Link to={routes.members({ page: i + 1 })}>{i + 1}</Link>
//   //     </li>
//   //   )
//   // }
//   const onChange = (e) => {
//     navigate(routes.members({page: e}))
//       setActivePage(e)
//       console.log(e)
//   }
//   return (
//     <>
//       {/* <div className='pagination'>
//         <h2>Page</h2>
//         <ul>{items}</ul>
//       </div> */}

//     <Pagination page={activePage} onChange={(e) => onChange(e)} total={totalPage} radius="lg" withEdges/>;
//     </>)

// }

// export default MemberPagination
