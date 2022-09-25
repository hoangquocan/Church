import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import SetRoles from 'src/components/Admin/SetRoles/SetRoles'
const AdminPage = () => {
  // function togle(a, num) {
  //   let arr1 = [0, 0, 0]
  //   let arr2 = [0, 0, 0]

  //   for (let i = 1; i <= num ; i++){
  //       console.log(arr1, "arr1")
  //       arr2[0] = (arr2[0] == 0) ? 1 : 0
  //     //   console.log(arr2[0], "arr2")
  //     // console.log(arr1[0], "arr1")
  //     for ( let j = 0; j < a ; j++) {
  //       if(arr2[j] < arr1[j] ) {
  //           arr2[j+1] = (arr1[j+1] == 1)? 0 :1
  //       }
  //     }


  //     // console.log(arr2)
  //     arr1 = arr2
  //   }

  //   return arr2
  // }
  // console.log(togle(3,2))
  return (
    <>
      <MetaTags title="Admin" description="Admin page" />

      <h1 className='text-center'>Admin Page</h1>
    </>
  )
}

export default AdminPage
