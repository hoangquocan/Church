import { Avatar, Group, Stack, Text } from '@mantine/core'
import { memo } from 'react'

import './RecentActivity.scss'

const RecentActivity = ({ activities }) => {
  const members = activities[0].attendance.map((item) => ({
    name: item.member.name,
    urlAvatar: item.member.urlAvatar,
    phone: item.member.phoneNumber,
  }))
  const totalMembers = members.length
  const activityOne = activities[0]
  const attendanceOne = activityOne?.attendance?.map((item) => item.present)
  const activityTwo = activities[1]
  const attendanceTwo = activityTwo?.attendance?.map((item) => item.present)
  const activityThree = activities[2]
  const attendanceThree = activityThree?.attendance?.map((item) => item.present)
  const trueMemberTwo =
    activityTwo?.attendance?.length == activityOne?.attendance?.length

  const trueMemberThree =
    activityThree?.attendance?.length == activityOne?.attendance?.length
  for (let i = 0; i < totalMembers; i++) {
    members[i].attOne = attendanceOne[i]
    trueMemberTwo ? (members[i].attTwo = attendanceTwo[i]) : null
    trueMemberThree ? (members[i].attThree = attendanceThree[i]) : null
  }
  const timetag = (datetime) => {
    return (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toLocaleDateString('pt-BR')}
      </time>
    )
  }
console.log(activities)
console.log('activities')
  return (
    <div>
      <h1 className='text-title'>Recent Activities</h1>
      <div className="recentActivity-wrapper">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>{timetag(activityOne.date)}</th>
              {trueMemberTwo && <th>{timetag(activityTwo.date)}</th>}
              {trueMemberThree && <th>{timetag(activityThree?.date)}</th>}
            </tr>
          </thead>
          <tbody>
            {members.map((item, i) => (
              <tr key={i}>
                <td className="members">
                  <Group spacing="xs">
                    <Avatar
                      src={item.urlAvatar}
                      radius="50%"
                      size="50px"
                      color="cyan"
                      styles={() => ({
                        root: {
                          // border: '2px solid #909296',
                          boxShadow: 'inset 0 2px 4px 0 hsla(0, 0%, 0%, 0.7)',
                          '@media(max-width: 1024px)': {
                            minWidth: '40px',
                            width: '40px',
                            height: '40px',
                          },
                          '@media(max-width: 480px)': {
                            minWidth: '30px',
                            width: '36px',
                            height: '36px',
                          },
                        },
                      })}
                    />
                    <Stack spacing={4}>
                      <p>{item.name}</p>
                      <span>{item.phone}</span>
                    </Stack>
                  </Group>
                </td>
                <td className={item.attOne ? 'Present' : 'Absent'}>
                  {item.attOne ? 'Present' : 'Absent'}
                </td>
                {trueMemberTwo && (
                  <td className={item.attTwo ? 'Present' : 'Absent'}>
                    {item.attTwo ? 'Present' : 'Absent'}
                  </td>
                )}
                {trueMemberThree && (
                  <td className={item.attThree ? 'Present' : 'Absent'}>
                    {item.attThree ? 'Present' : 'Absent'}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentActivity
