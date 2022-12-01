import { useState, useEffect } from 'react'
import { useMutation } from '@redwoodjs/web'
import { showNotification } from '@mantine/notifications'
import { openConfirmModal } from '@mantine/modals'

import './ImportFile.scss'

const CREATE_MANY_MEMBERS = gql`
  mutation CreateManyMembers($input: [CreateMemberInput!]!) {
    createManyMembers(input: $input) {
      members {
        name
        birthDate
        email
        address
        phoneNumber
        groupId
      }
    }
  }
`

const ImportFile = () => {
  const [file, setFile] = useState()
  const [array, setArray] = useState([])

  const fileReader = new FileReader()
  const [createManyMembers] = useMutation(CREATE_MANY_MEMBERS, {
    onCompleted: () => {
      showNotification({
        color: 'blue',
        title: 'Done! Members has been imported to data',
        autoClose: 4000,
        radius: 'md',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.blue[9],
            backgroundColor: theme.colors.blue[2],
            '&::before': { backgroundColor: theme.blue },
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
      setFile()
      setArray([])
    },
    onError: () => {
      showNotification({
        color: 'red',
        title: 'Notification!',
        message:
          'Please check your file if it has member already created or field Group did not created',
        rd: 'md',
        autoClose: false,
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.red[7],
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
    },
  })
  useEffect(() => {
    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result
        csvFileToArray(text)
      }

      fileReader.readAsText(file)
    }
  }, [file])

  const handleOnChange = (e) => {
    setFile(e.target.files[0])
  }
  const csvFileToArray = (string) => {
    const csvHeader = string.slice(0, string.indexOf('\n')).split(',')
    const csvRows = string.slice(string.indexOf('\n') + 1).split('\n')
    csvRows.pop()
    const array = csvRows.map((item) => {
      const values = item.split(',')
      const obj = csvHeader.reduce((object, header, index) => {
        object[header.trim()] = values[index].trim()
        return object
      }, {})
      obj.groupId = +obj.groupId
      obj.birthDate = new Date(obj.birthDate)
      return obj
    })
    setArray(array)

  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    openConfirmModal({
      title: 'Please Confirm Your Action!',
      children: <p>Are you want to import this file?</p>,
      labels: { confirm: 'Yes', cancel: 'Cancel' },
      onConfirm: () => {
        createManyMembers({ variables: { input: array } })
      },
    })
  }
  const handleClick = (e) => {
  e.target.value = ''
  }

  return (
    <div className="importfile-wrapper" style={{ textAlign: 'center' }}>
      <h2>Upload File Members</h2>
      <form onSubmit={(e) => handleOnSubmit(e)}>
        <input type="file" accept={'.csv'} onClick={(e) => handleClick(e)} onChange={handleOnChange} required />
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            fontWeight: 500,
            width: '126px',
            border: 'none',
            color: '#fff',
            borderTopRightRadius: '20px',
            borderBottomRightRadius: '20px',
            backgroundImage: 'linear-gradient(to right, #753a88, #C2255C)',
          }}
          type="submit"
        >
          Upload
          <ion-icon
            style={{ paddingLeft: '6px', fontSize: '24px' }}
            name="cloud-upload-outline"
          ></ion-icon>
        </button>
      </form>
      <br />
      <table>
        {file && (
          <thead>
            <tr key={'header'}>
              <th>Name</th>
              <th>BirthDate</th>
              <th>PhoneNumber</th>
              <th>Email</th>
              <th>Address</th>
              <th>Group Id</th>
            </tr>
          </thead>
        )}

        <tbody>
          {array.map((member, idx) => (
            <tr key={idx}>
              <td>{member.name}</td>
              <td>{new Date(member.birthDate).toLocaleDateString('sv')}</td>
              <td>{member.phoneNumber}</td>
              <td>{member.email}</td>
              <td>{member.address}</td>
              <td>{member.groupId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ImportFile
