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
    let percent =
      +((totalMemPresent[i] / totalMemAtten[i]) * 100).toFixed(2) || 0
    if (percent) {
      percentPresent.push(percent)
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
    <div className="memberAttendance-wrapper">
      <div className="member-maxPresent">
        <span>{maxPresent}%</span> <span>Present</span>
        <ion-icon name="ribbon-outline"></ion-icon>
        {membersMax.map((member) => (
          <Group mt={20} key={member.id}>
            <Avatar
              src={member.urlAvatar}
              radius="xl"
              size="50px"
              color="cyan"
              border="2px solid #FFF"
              styles={() => ({
                root: { border: '2px solid #25262B' },
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
      <Divider size="md" mb={20} />
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
  )
}

export default MemberAttendance
