import { useState } from 'react'
import { Avatar, Modal } from '@mantine/core'
import { Link, routes } from '@redwoodjs/router'

import EditMember from '../EditMember/EditMember'
import EditAvatar from 'src/components/EditAvatar/EditAvatar'
import './Member.scss'

const Member = ({ member, handleModal, idx }) => {
  const [opened, setOpened] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  // const [updateMember] = useMutation(UPDATE_MEMBER, {
  //   refetchQueries: [
  //     { query: MembersQuery, variables: { id: member.groupId } },
  //   ],
  // })
  // const handleClick = (id, groupId) => {
  //   if (confirm('Are you sure?')) {
  //     updateMember({
  //       variables: { id, input: { groupId } },
  //     })
  //   }
  // }
  const handleCloseModal = () => {
    setOpened(false)
  }
  // const handleModalEdit = () => {
  //   setOpenEdit(false)
  // }
  console.log(member)
  return (
    <div className="member-wrapper">
      <div className="member-avatar">
        <Avatar.Group spacing="sm">
          <Avatar
            src={member.urlAvatar}
            size={90}
            radius="50%"
            color="blue"
            styles={() => ({
              root: {
                boxShadow: ' 0 2px 4px 0 hsla(0, 0%, 0%, 0.4)',
              },
            })}
          />
          <ion-icon
            name="camera-reverse-outline"
            onClick={() => setOpened(true)}
          ></ion-icon>
        </Avatar.Group>
      </div>
      <table cellSpacing="0">
        <tbody>
          <tr>
            <th>FullName</th>
            <td>{member.name}</td>
          </tr>
          <tr>
            <th>Date Of Birth</th>
            <td>{new Date(member.birthDate).toLocaleDateString('pt-BR')}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{member.email}</td>
          </tr>
          <tr>
            <th>Phone Number</th>
            <td>{member.phoneNumber}</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>{member.address}</td>
          </tr>
          <tr>
            <th>Group</th>
            <td>
              {member.group !== null ? (
                member.group.name
              ) : (
                <Link
                  className="inline-button inline-button-small inline-button-green"
                  to={routes.groups()}
                >
                  Add To Group <ion-icon name="arrow-redo-outline"></ion-icon>
                </Link>
              )}
            </td>
          </tr>
          <tr>
            <th>Created At</th>
            <td>{new Date(member.createdAt).toLocaleDateString('sv')}</td>
          </tr>
        </tbody>
      </table>
      <Modal
        title="Update Avatar"
        opened={opened}
        onClose={() => setOpened(false)}
        zIndex={101}
        overlayOpacity={0.2}
        overlayBlur={3}
        styles={(theme) => ({
          modal: {
            background: '#2C2E33',
            boxShadow: '0 15px 25px rgba(0, 0, 0, .9)',
            width: 600,
            borderRadius: '10px',
            marginLeft: 290,
            marginTop: 200,
            '@media(max-width: 1024px)': {
              width: 520,
              marginLeft: 0,
            },
            '@media(max-width: 480px)': {
              width: 410,
              marginTop: 120,
            },
          },
          inner: {
            backgroundColor: 'transparent',
            textAlign: 'center',
          },
          header: {
            fontSize: '1.4rem',
            fontWeight: 500,
            color: '#fff',
          },
          close: {
            backgroundColor: '#DEE2E6',
            marginRight: 14,
            marginTop: 2,
            color: '#000',
            width: 36,
            height: 36,
            borderRadius: '50%',
          },
        })}
      >
        <EditAvatar
          member={member}
          handleModal={handleModal}
          handleCloseModal={handleCloseModal}
          idx={idx}
        />
      </Modal>
      {/* <Modal
        title="Update Member"
        opened={openEdit}
        onClose={() => setOpenEdit(false)}
        zIndex={3}
        styles={(theme) => ({
          modal: {
            marginTop: '50px',
            width: 'auto',
            backgroundColor: '#2C2E33',
            '@media(min-width: 1024px)': {
              marginLeft: '300px',
            },
          },
          header: {
            fontSize: '1.4rem',
            marginBottom: 0,
            paddingBottom: 10,
            fontWeight: 500,
          },
          close: {
            backgroundColor: '#f2f2f2',
            marginRight: 10,
            width: 32,
            height: 32,
          },
        })}
      >
        <EditMember member={member} handleModal={handleModalEdit} />
      </Modal> */}
    </div>
  )
}

export default Member
