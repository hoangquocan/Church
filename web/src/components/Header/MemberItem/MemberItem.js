import './MemberItem.scss'
import { Avatar, Group, Stack, Text } from '@mantine/core'
import { Link, routes } from '@redwoodjs/router'

const MemberItem = ({ data }) => {
  return (
    <div className="memberitem-wrapper">
      <Group>
          <Link to={routes.member({ id: data.id })}>
        <Avatar src={data.urlAvatar} radius="xl" size="lg" />
          </Link>
        <Stack spacing={1}>
          <Text size="sm" weight={700} sx={{ lineHeight: 1 }}>
            {data.name}
          </Text>
            <p>{data.email}</p>
        </Stack>
      </Group>
    </div>
  )
}

export default MemberItem
