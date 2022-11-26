import './MemberItem.scss'
import { Avatar, Group, Stack, Text } from '@mantine/core'
import { Link, routes } from '@redwoodjs/router'

const MemberItem = ({ data }) => {
  return (
    <div className="memberitem-wrapper">
      <Link to={routes.member({ id: data.id })}>
        <Group>
          <Avatar src={data.urlAvatar} radius='50%' size="lg" color="cyan" />
          <Stack spacing={1}>
            <Text size="sm" weight={700} sx={{ lineHeight: 1.6 }}>
              {data.name}
            </Text>
            <p>{data.email}</p>
          </Stack>
        </Group>
      </Link>
    </div>
  )
}

export default MemberItem
