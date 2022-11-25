import { Avatar, Divider, Group, Stack, Text } from '@mantine/core'
import './MemberAttendance.scss'

const MemberAttendance = ({ group }) => {
  const members = group.members
  const totalMembers = members.length
  const totalMemAtten = members.map((member) => member.attendance.length)
  const totalMemPresent = members.map(
    (member) =>
      member.attendance.filter((atten) => atten.present === true).length
  )

  const percentPresent = []
  for (let i = 0; i < totalMembers; i++) {
    let percent = +((totalMemPresent[i] / totalMemAtten[i]) * 100).toFixed(2)
    if (percent) {
      percentPresent.push(percent)
    } else {
      percentPresent.push(0)
    }
  }
  const maxPresent = percentPresent.length ? Math.max(...percentPresent) : 0
  const minPresent = percentPresent.length ? Math.min(...percentPresent) : 0
  const membersMax = []
  const membersMin = []
  for (let i = 0; i < totalMembers; i++) {
    if (percentPresent[i] == maxPresent) {
      membersMax.push(members[i])
    } else if (percentPresent[i] == minPresent) {
      membersMin.push(members[i])
    }
  }
  return (
    <>
      {members[0]?.attendance.length > 0 && (
        <div>
          <h1 className="text-title">Percent Attendance</h1>
          <div className="memberAttendance-wrapper">
            <div className="member-maxPresent">
              <span>{maxPresent}%</span> <span>Present</span>
              <ion-icon name="ribbon-outline"></ion-icon>
              {membersMax.map((member) => (
                <Group key={member.id}>
                  <Avatar
                    src={member.urlAvatar}
                    radius="xl"
                    size="50px"
                    color="cyan"
                    // variant='filled'
                    styles={() => ({
                      root: {
                        // border: '2px solid #909296',
                        boxShadow: 'inset 0 2px 4px 0 hsla(0, 0%, 0%, 0.7)',
                      },
                    })}
                  />
                  <Stack spacing={8}>
                    <Text size="md" weight={700} sx={{ lineHeight: 1 }}>
                      {member.name}
                    </Text>
                    {/* <span>{member.phoneNumber}</span> */}
                  </Stack>
                </Group>
              ))}
            <Divider size="md" mb={20} mt={20} color="#1864AB" />
            </div>
            <div className="member-minPresent">
              <span>{minPresent}% </span>
              <span>Present</span>
              <ion-icon name="warning-outline"></ion-icon>
              {membersMin.map((member) => (
                <Group key={member.id}>
                  <Avatar
                    src={member.urlAvatar}
                    radius="xl"
                    size="50px"
                    color="cyan"
                    styles={() => ({
                      root: {
                        // border: '2px solid #909296',
                        boxShadow: ' 0 2px 4px 0 hsla(0, 0%, 0%, 0.4)',
                      },
                    })}
                  />
                  <Stack spacing={8}>
                    <Text size="md" weight={700} sx={{ lineHeight: 1 }}>
                      {member.name}
                    </Text>
                    {/* <span>{member.phoneNumber}</span> */}
                  </Stack>
                </Group>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MemberAttendance
