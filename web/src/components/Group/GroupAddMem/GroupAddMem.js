import { useMutation } from '@redwoodjs/web'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { QUERY } from '../GroupAddMemCell'

import './GroupAddMem.scss'

const UPDATE_MEMBER = gql`
  mutation UpdateMemberMutation($id: Int!, $input: UpdateMemberInput!) {
    updateMember(id: $id, input: $input) {
      id
      groupId
    }
  }
`
const GroupAddMem = ({ members, id }) => {
  const [updateMember, { loading, error }] = useMutation(UPDATE_MEMBER, {
    onCompleted: () => {
      showNotification({
        color: 'teal',
        title: 'Member Has Been Added!',
        message: 'You can add another member to this Group',
        icon: <ion-icon name="checkmark-outline"></ion-icon>,
        autoClose: 4000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.teal[7],

            '&::before': { backgroundColor: theme.teal },
          },

          closeButton: {
            color: theme.colors.gray[7],
            '&:hover': {
              color: theme.white,
              backgroundColor: theme.colors.gray[6],
            },
          },
        }),
      })
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })
  const handleClick = (id, groupId) =>
    {
      openConfirmModal({
      title: 'Please Confirm Your Action!',
      children: <p>Are you sure add to this Group?</p>,
      labels: { confirm: 'Yes', cancel: 'Cancel' },
      onConfirm: () => updateMember({ variables: { id, input: { groupId } } }),
    })}

  return (
    <div className="group-addmem">
    <h2></h2>
      <table cellSpacing="0">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Date Of Birth</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>
                {member.urlAvatar ? (
                  <img src={member.urlAvatar} alt="Avatar" />
                ) : (
                  <ion-icon name="person-outline"></ion-icon>
                )}
              </td>
              <td>{member.name}</td>
              <td>{new Date(member.birthDate).toLocaleDateString('sv')}</td>
              <td>{member.email}</td>
              <td>{member.phoneNumber}</td>
              <td>{member.address}</td>
              <td>
                <button
                  className="inline-button inline-button-small inline-button-green"
                  disabled={loading}
                  onClick={() => handleClick(member.id, +id)}
                >
                  <ion-icon name="enter-outline"></ion-icon>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GroupAddMem
