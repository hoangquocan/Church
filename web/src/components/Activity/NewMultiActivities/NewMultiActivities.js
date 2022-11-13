import { useContext, useState } from 'react'
import { useForm as useReactForm } from 'react-hook-form'
import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import { TextInput, MultiSelect, Button } from '@mantine/core'
import { openConfirmModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'

import { RefContext } from 'src/components/Context/Context'
import DatePicker from 'src/components/Form/DatePicker/DatePicker'
import 'src/components/Member/MemberForm/MemberForm.scss'
import './NewMultiActivities.scss'

const CREATE_MULTI_ACTIVITIES = gql`
  mutation createManyActivities($input: [CreateActivityInput!]!) {
    createManyActivities(input: $input) {
      activities {
        name
        date
        groupId
      }
    }
  }
`
const NewMultiActivities = () => {
  const [name, setName] = useState('')
  const [valueGroups, setValueGroups] = useState([])
  const { control, handleSubmit } = useReactForm()
  const { groups } = useContext(RefContext)
  const [createManyActivities] = useMutation(CREATE_MULTI_ACTIVITIES, {
    onCompleted: () => {
      showNotification({
        color: 'blue',
        title: 'Activitis Have Been Created!',
        message: 'Leader can view and attendance it',
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
      navigate(routes.activities())
    },
  })


  console.log(groups)
  const SelectAll = [
    {
      value: groups.map((group) => {
        return group.id
      }),
      label: 'Select All Groups',
    },
  ]
  const dataSelect = SelectAll.concat(
    groups.map((group) => ({
      value: group.id,
      label: group.name,
    }))
  )

  const onSubmit = (data) => {
    const input = valueGroups.map((item) => ({
      name: name,
      groupId: item,
      ...data,
    }))
    openConfirmModal({
      title: 'Please Confirm Your Action!',
      children: <p>Are you sure create these activities?</p>,
      labels: { confirm: 'Yes', cancel: 'Cancel' },
      onConfirm: () =>
        createManyActivities({
          variables: { input: input },
        }),
    })
  }
  const handleSelect = (e) => {
    setValueGroups([...new Set(e.flat())])
  }

  return (
    <div className="member-form">
      <form style={{ paddingTop: '80px' }} onSubmit={handleSubmit(onSubmit)}>
        <label>Activity Name</label>
        <TextInput
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <label>Date Participate</label>
        <DatePicker
          name="date"
          control={control}
          showTimeSelect
          dateFormat="yyyy/MM/dd hh:mm aa"
        />
        <label>Select Groups</label>
        <MultiSelect
          variant="unstyled"
          data={dataSelect}
          value={valueGroups}
          onChange={(e) => handleSelect(e)}
          transitionDuration={500}
          transition="pop-top-left"
          transitionTimingFunction="ease"
          searchable
          nothingFound="No Group Found"
          placeholder="Pick all that you like"
          styles={() => ({
            input: {
              minHeight: '40px',
              padding: '6px 20px',
            },
            value: {
              fontSize: '16px',
            },
            dropdown: {
              boxShadow:
                'rgba(0, 0, 0, 0.6) 0px 8px 15px, rgba(0, 0, 0, 0.6) 0px 8px 15px',
            },
            values: {
              borderRadius: '10px',
            },
          })}
        />
        <div className="form-btn">
          <Button type="submit">
            Save <ion-icon name="checkmark-circle-outline"></ion-icon>
          </Button>
        </div>
      </form>
    </div>
  )
}

export default NewMultiActivities
