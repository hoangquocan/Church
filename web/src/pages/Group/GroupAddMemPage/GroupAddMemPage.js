import GroupAddMemCell from 'src/components/Group/GroupAddMemCell'

const GroupAddMemPage = ({ id, name }) => {

  return <>
    <h2 className='text-center'>Add Member To {name}</h2>
    <GroupAddMemCell id={id} />
   </>
}

export default GroupAddMemPage
