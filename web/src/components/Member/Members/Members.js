import { useMutation } from '@redwoodjs/web'
import { useEffect, useRef } from 'react'
import { Link, routes } from '@redwoodjs/router'
import { Text, Avatar } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'

import { QUERY as MembersQuery } from 'src/components/Group/GroupMembersCell'
import '../MembersLoad/MembersLoad.scss'
import './Members.scss'

const UPDATE_MEMBER = gql`
  mutation UpdateMemberMutation($id: Int!, $input: UpdateMemberInput!) {
    updateMember(id: $id, input: $input) {
      id
      groupId
    }
  }
`
const Members = ({ groupId, members }) => {
  const btnRefs = useRef([])
  useEffect(() => {
    btnRefs.current = btnRefs.current.slice(0, members.length)

    return () => {
      btnRefs.current = []
    }
  }, [members])

  const [updateMember] = useMutation(UPDATE_MEMBER, {
    onCompleted: () => {
      showNotification({
        color: 'red',
        title: 'Member Has Been Removed From Group!',
        message: 'You can still add back that member to this Group',
        autoClose: 4000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.red[4],
            backgroundColor: theme.colors.red[1],
            '&::before': { backgroundColor: theme.red },
          },

          title: { color: theme.colors.red[5] },
          closeButton: {
            color: theme.colors.gray[7],
            '&:hover': {
              color: theme.white,
              backgroundColor: theme.colors.gray[6],
            },
          },
        }),
      })
      // if (membersRender[activePage - 1].length < 2) {
      //   setActivePage((prev) => prev - 1)
      // }
    },
    refetchQueries: [{ query: MembersQuery, variables: { id: groupId } }],
  })

  const handleClick = (id, groupId) => {
    openConfirmModal({
      title: 'Please Confirm Your Action!',
      children: <p>Are you sure want to delete member of Group?</p>,
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () =>
        updateMember({
          variables: { id, input: { groupId } },
        }),
    })
  }
  const handleMouseEnter = (idx) => {
    setTimeout(() => {
      btnRefs.current[idx].classList.add('hovered')
    }, 400)
  }
  const handleMouseLeave = (idx) => {
    setTimeout(() => {
      btnRefs.current[idx].classList.remove('hovered')
    }, 400)
  }
  return (
    <div className="members-wrapper">
      {members.map((member, idx) => (
        <div
          key={member.id}
          className="members-item"
          onMouseEnter={() => handleMouseEnter(idx)}
          onMouseLeave={() => handleMouseLeave(idx)}
        >
          <Link to={routes.member({ id: member.id })} title="View Profile">
            <Avatar
              src={member.urlAvatar}
              radius="50%"
              size="80px"
              mt={-30}
              color="cyan"
              styles={() => ({
                root: {
                  border: '3px solid #1A1B1E',
                  marginTop: '10px',
                  '@media(max-width: 1024px)': {
                    minWidth: '60px',
                    width: '60px',
                    height: '60px',
                  },
                },
              })}
            />
          </Link>
          <Text weight={600} size="20px" color='#A61E4D'>
            {member.name}
          </Text>
          <Text size="md">
            {new Date(member.birthDate).toLocaleDateString('pt-BR')}
          </Text>
          <Text italic size="md">
            {member.email}
          </Text>
          <Text size="md">{member.phoneNumber}</Text>
          <Text size="md" lineClamp={1} mb={40}>
            {member.address}
          </Text>
          <button
            type="button"
            ref={(el) => (btnRefs.current[idx] = el)}
            className="button-inline-icon"
            onClick={() => handleClick(member.id, null)}
          >
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        </div>
      ))}
    </div>
  )
}

export default Members
