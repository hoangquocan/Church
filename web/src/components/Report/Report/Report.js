import { Label, FormField, FieldError, SelectField } from "@redwoodjs/forms"
import { useContext } from "react"
import { Context } from "src/components/Context/Context"
import DatePicker from "../../Form/DatePicker/DatePicker"

import { useQuery, gql } from "@redwoodjs/web"
import { QUERY } from 'src/components/Group/GroupsCell'
const GROUPS_QUERY = gql`
  query GetGroups {
    groups{
      id
      name
    }
  }
`

const Report = () => {
  // const groups = useContext(Context)
  const { data } = useQuery(QUERY)
console.log(data)

  return (
    <div className='report-form'>
<FormField >
<Label name="groupId">Group To View</Label>

<SelectField
  name="groupId"
  defaultValue=""
  validation={{ valueAsNumber: true }}
  required
>
  <option value="" disabled hidden>
    Select One Group
  </option>
  {data.groups.map((group) => (
    <option key={group.id} value={group.id}>
      {group.name}
    </option>
  ))}
</SelectField>
<FieldError name="groupId" />
<Label name='startDate'>Start Date</Label>
  <DatePicker name='startDate'/>

<Label name='endDate'>Start Date</Label>
  <DatePicker name='endDate'/>
</FormField>
    </div>
  )
}

export default Report
