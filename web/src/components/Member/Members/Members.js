import { useMutation } from '@redwoodjs/web'
import { QUERY as MembersQuery } from 'src/components/Group/GroupMembersCell'
import { Link, routes } from '@redwoodjs/router'
import { useState, useMemo } from 'react'
import { Pagination, Text, useMantineTheme, Avatar } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { useMediaQuery } from '@mantine/hooks'

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
        color: 'red',
        title: 'Member Has Been Removed From Group!',
        message: 'You can still add back that member to this Group',
        // icon: (
        //   <ion-icon
        //     style={{ color: 'white' }}
        //     name="checkmark-outline"
        //   ></ion-icon>
        // ),
        autoClose: 4000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.red[4],

            '&::before': { backgroundColor: theme.white },
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

  const theme = useMantineTheme()

  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`)

  return (
    <div className="members-wrapper">
      {members.map((member) => (
        <div key={member.id} className="members-item">
          <Link to={routes.member({ id: member.id })} title="View Profile">
            <Avatar
              src={member.urlAvatar}
              radius="50%"
              size="80px"
              // mt={-30}
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
          <Text weight={600} size="20px">{member.name}</Text>
          <Text>{new Date(member.birthDate).toLocaleDateString('sv')}</Text>
          <Text>{member.email}</Text>
          <Text>{member.phoneNumber}</Text>
          <Text lineClamp={1}>{member.address}</Text>
              <button
              type='button'
                className="inline-button inline-button-small inline-button-red"
                onClick={() => handleClick(member.id, null)}
              >
                <ion-icon name="trash-outline"></ion-icon> Delete
              </button>
          {/* <Text>
            {isEdit && (
              <Link to={routes.editMember({ id: member.id })}>
                <ion-icon
                  style={{
                    color: '#15AABF',
                  }}
                  name="pencil-outline"
                ></ion-icon>
              </Link>
            )}
          </Text> */}
        </div>
      ))}
      {/* {!isGroup ? (
        <div className="members-link">
          <button
            onClick={() => setIsEdit(!isEdit)}
            className="inline-button inline-button-small inline-button-blue"
          >
            <ion-icon name="create-outline"></ion-icon>Update Member
          </button>
        </div>
      ) : (
        ''
      )} */}
      {/* <div className="members-pagination">
        <Pagination
          position="center"
          page={activePage}
          onChange={setActivePage}
          total={totalPage}
          radius="lg"
          withEdges
          size={isMobile ? 'xs' : 'md'}
          styles={{
            item: {
              fontWeight: '300',
            },
          }}
        />
      </div> */}
    </div>
  )
}

export default Members
