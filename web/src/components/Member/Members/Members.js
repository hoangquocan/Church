import { useMutation } from '@redwoodjs/web'
import { QUERY as MembersQuery } from 'src/components/Group/GroupMembersCell'
import { Link, routes } from '@redwoodjs/router'
import { useState, useMemo } from 'react'

import { Pagination, useMantineTheme } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useMediaQuery } from "@mantine/hooks";

import './Members.scss'

const UPDATE_MEMBER = gql`
  mutation UpdateMemberMutation($id: Int!, $input: UpdateMemberInput!) {
    updateMember(id: $id, input: $input) {
      id
      groupId
    }
  }
`
const Members = ({ groupId, members, isGroup = false }) => {
  const [activePage, setActivePage] = useState(1)

  const totalMembers = members.length
  const totalPage = Math.ceil(totalMembers / 6)
  const membersRender = []
  for (let i = 0; i < totalMembers; i += 6) {
    const membersPage = members.slice(i, i + 6)
    membersRender.push(membersPage)
  }
  const [updateMember] = useMutation(UPDATE_MEMBER, {
    onCompleted: () => {
      showNotification({
        color: 'teal',
        title: 'Member Has Been Removed From Group!',
        message: 'You can still add back that member to this Group',
        icon: <ion-icon name="checkmark-outline"></ion-icon>,
        autoClose: 4000,
        radius: 'lg',
      })
    },
    refetchQueries: [{ query: MembersQuery, variables: { id: groupId } }],
  })

  const handleClick = (id, groupId) => {
    if (confirm('Are you sure?')) {
      updateMember({
        variables: { id, input: { groupId } },
      })
    }
  }
  // const totalMembers = members.length
  // const totalPage = Math.ceil(totalMembers / 5)
  // const resultMembers = useMemo(() => {
  //   const membersRender = []
  //   for (let i = 0; i < totalMembers; i += 5) {
  //     const membersPage = members.slice(i, i + 5)
  //     membersRender.push(membersPage)
  //   }
  //   return membersRender
  // }, [members])

  const thumbnail = (url) => {
    const parts = url.split('/')
    parts.splice(3, 0, 'resize=width:100')
    return parts.join('/')
  }
  const theme = useMantineTheme();

  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

console.log('Members render')
  return (
    <div className="members-table">
      {!isGroup ? (
        <div className="members-link">
          <Link
            to={routes.newMember()}
            className="inline-button inline-button-small inline-button-green"
          >
            <ion-icon name="person-add-outline"></ion-icon>New Member
          </Link>
        </div>
      ) : (
        ''
      )}
      <table cellSpacing="0">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Group</th>
          </tr>
        </thead>
        <tbody>
          {membersRender[activePage - 1].map((member) => (
            <tr key={member.id}>
              <td>
                <Link
                  to={routes.member({ id: member.id })}
                  title="View Profile"
                >
                  {member.urlAvatar ? (
                    <img src={thumbnail(member.urlAvatar)} alt="Avatar" />
                  ) : (
                    <ion-icon name="person-outline"></ion-icon>
                  )}
                </Link>
              </td>
              <td>{member.name}</td>
              <td>{new Date(member.birthDate).toLocaleDateString('sv')}</td>
              <td>{member.email}</td>
              <td>{member.phoneNumber}</td>
              <td>{member.address}</td>
              {isGroup ? (
                <td>
                  <button
                    className="inline-button inline-button-small inline-button-red"
                    onClick={() => handleClick(member.id, null)}
                  >
                    <ion-icon name="trash-outline"></ion-icon> Delete
                  </button>
                </td>
              ) : (
                <td>
                  {member.group != null ? member.group.name : 'No Group Yet'}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="members-pagination">
        <Pagination
          position="center"
          page={activePage}
          onChange={setActivePage}
          total={totalPage}
          radius="lg"
          withEdges
          size={isMobile ? "xs" : "md"}
          styles={{size: 100}}
        />
      </div>
    </div>
  )
}

export default Members
