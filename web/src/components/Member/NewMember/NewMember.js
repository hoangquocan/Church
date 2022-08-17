import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import MemberForm from 'src/components/Member/MemberForm'
import { toast } from '@redwoodjs/web/toast'

const CREATE_MEMBER_MUTATION = gql`
  mutation CreateMemberMutation($input: CreateMemberInput!) {
    createMember(input: $input) {
      id
      name
      birthDate
      phoneNumber
      email
      address
    }
  }
`
const NewMember = () => {
  const [createMember, { loading, error }] = useMutation(
    CREATE_MEMBER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Member Created!')
        navigate(routes.members())
      },
    }
  )

  const onSave = (data, input) => {
    createMember({ variables: { input: { ...input, ...data } } })
  }

  return (
    <>
      <h2 className="text-center">ADD NEW MEMBER</h2>

      <MemberForm onSave={onSave} loading={loading} error={error} />
    </>
  )
}

export default NewMember
