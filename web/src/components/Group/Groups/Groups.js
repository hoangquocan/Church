import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { Pagination } from '@mantine/core'
import { useState, useMemo } from 'react'
import { showNotification } from '@mantine/notifications'
import { openConfirmModal } from '@mantine/modals'

import { QUERY } from '../GroupsCell'
import './Groups.scss'

const DELETE_GROUP_MUTATION = gql`
  mutation DeleteGroupMutation($id: Int!) {
    deleteGroup(id: $id) {
      id
    }
  }
`
const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toLocaleDateString('sv')}
    </time>
  )
}
const Groups = ({ groups }) => {
  const [activePage, setActivePage] = useState(1)
  const [isDelete, setIsDelete] = useState(false)
  const [isShow, setIsShow] = useState(false)
  const [isAdd, setIsAdd] = useState(false)

  const [deleteGroup] = useMutation(DELETE_GROUP_MUTATION, {
    onCompleted: () => {
      showNotification({
        color: 'red',
        title: 'Group Has Been Deleted!',
        icon: <ion-icon name="checkmark-outline"></ion-icon>,
        autoClose: 4000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            // backgroundColor: theme.colors.blue[6],
            borderColor: theme.colors.red[4],

            // '&::before': { backgroundColor: theme.white },
          },

          title: { color: theme.colors.red[5] },
          // description: { color: theme.white },
          closeButton: {
            color: theme.colors.gray[7],
            '&:hover': {  color: theme.white ,backgroundColor: theme.colors.gray[6] },
          },
        }),
      })
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const handleClick = (id, name) => {
    openConfirmModal({
      title: 'Please Confirm Your Action!',
      children: <p>Are you sure want to  delete Group {name}?</p>,
      labels: { confirm: 'Yes', cancel: 'Cancel' },
      onConfirm: () => deleteGroup({ variables: {id} }),
    })
  }
  const totalGroups = groups.length
  const totalPage = Math.ceil(totalGroups / 10)
  const resultGroups = useMemo(() => {
    const groupsRender = []
    for (let i = 0; i < totalGroups; i += 10) {
      const groupsPerPage = groups.slice(i, i + 10)
      groupsRender.push(groupsPerPage)
    }
    return groupsRender
  }, [groups])

  console.log('groups render')

  return (
    <div className="groups-wrapper">
      <div className="groups-header">
        <Link
          to={routes.newGroup()}
          className="inline-button inline-button- small inline-button-green"
        >
          <ion-icon name="add-circle-outline"></ion-icon>New Group
        </Link>
        <nav>
          <button
            onClick={() => setIsShow(!isShow)}
            className="inline-button inline-button-small inline-button-blue"
            title="Show Group"
          >
            <ion-icon name="information-circle-outline"></ion-icon>Show Info
          </button>
          <button
            onClick={() => setIsAdd(!isAdd)}
            className="inline-button inline-button-small inline-button-green"
            title="Add Member"
          >
            <ion-icon name="person-add-outline"></ion-icon>Add Member
          </button>
          <button
            onClick={() => setIsDelete(!isDelete)}
            className="inline-button inline-button-small inline-button-red"
            title="Delete Group"
          >
            <ion-icon name="trash-outline"></ion-icon>Delete
          </button>
        </nav>
      </div>
      <table cellSpacing="0">
        <thead>
          <tr>
            <th>STT</th>
            <th>Group Name</th>
            <th>Leader</th>
            <th>Created At</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {resultGroups[activePage - 1].map((group) => (
            <tr key={group.id}>
              <td></td>
              <td>{group.name}</td>
              <td>{group.leader}</td>
              <td>{timeTag(group.createdAt)}</td>
              <td>
                <nav>
                  {isShow && (
                    <Link
                      to={routes.group({ id: group.id })}
                      title={'Show Group ' + group.name}
                    >
                      <ion-icon
                        style={{
                          color: '#15AABF',
                        }}
                        name="information-circle-outline"
                      ></ion-icon>
                    </Link>
                  )}
                  {isAdd && (
                    <Link
                      to={routes.groupAddMem({ id: group.id })}
                      title={'Add Member To ' + group.name}
                    >
                      <ion-icon
                        style={{
                          color: '#40C057',
                        }}
                        name="person-add-outline"
                      ></ion-icon>
                    </Link>
                  )}
                  {isDelete && (
                    <a
                    href="#"
                      style={{backgroundColor: 'transparent',}}
                      onClick={() => handleClick(group.id, group.name)}
                      title={'Delete Group ' + group.name}
                    >
                      <ion-icon
                        style={{
                          color: '#FA5252',
                        }}
                        name="trash-outline"
                      ></ion-icon>
                    </a>
                  )}
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="groups-pagination">
        <Pagination
          position="center"
          page={activePage}
          onChange={setActivePage}
          total={totalPage}
          radius="lg"
          withEdges
        />
      </div>
    </div>
  )
}

export default Groups
