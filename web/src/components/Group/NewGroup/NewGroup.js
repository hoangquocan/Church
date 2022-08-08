import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'
import GroupForm from 'src/components/Group/GroupForm'

const CREATE_GROUP_MUTATION = gql`
  mutation CreateGroupMutation($input: CreateGroupInput!) {
    createGroup(input: $input) {
      id
      name
      leader
      createdAt
    }
  }
`
const NewGroup = () => {
  const [createGroup, { loading, error }] = useMutation(CREATE_GROUP_MUTATION, {
    onCompleted: () => {
      toast.success('Group Created!')
      navigate(routes.groups())
    }
  })
  const onSave = (input) => {
    createGroup({ variables: { input }})
  }

  return (
    <>
      <h2 className='text-center'>ADD NEW GROUP</h2>
      <div>
        <GroupForm onSave={onSave} loading={loading} error={error} />
      </div>
    </>
  )
}

export default NewGroup
