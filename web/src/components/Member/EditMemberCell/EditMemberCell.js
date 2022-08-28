import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import MemberForm from '../MemberForm/MemberForm'

export const QUERY = gql`
  query FindMemberById($id: Int!) {
    member(id: $id) {
      id
      name
      birthDate
      email
      address
      group {
        name
        id
      }
      urlAvatar
    }
  }
`
const UPDATE_MEMBER = gql`
  mutation UpdateMemberMutation($id: Int!, $input: UpdateMemberInput!) {
    updateMember(id: $id, input: $input) {
      id
      name
      birthDate
      email
      address
      urlAvatar
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ member }) => {
  const [updateMember,{ loading}] = useMutation(UPDATE_MEMBER, {
    onCompleted: () => {
      navigate(routes.members())
    },
  })

  const onSave = (input, id) => {
    updateMember({ variables: { id, input } })
  }
  return (
    <div>
      <h5>Update Member {member.name}</h5>
      <div>
        <MemberForm member={member} onSave={onSave} loading={loading} />
      </div>
    </div>
  )
}
