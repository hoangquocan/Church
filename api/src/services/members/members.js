import { db } from 'src/lib/db'

const MEMBERS_PER_LOAD = 8

export const membersLoad = ({ load = 1}) => {
  const offset = (load - 1) * MEMBERS_PER_LOAD
console.log(load)
  return {
    members: db.member.findMany({
      take: MEMBERS_PER_LOAD,
      skip: offset,
      orderBy: { name: 'asc'}
    }),
    count: db.member.count()
  }
}
export const members = () => {
  return db.member.findMany({
    orderBy: { name: 'asc' },
  })
}

export const member = ({ id }) => {
  return db.member.findUnique({
    where: { id },
  })
}

export const createMember = ({ input }) => {
  return db.member.create({
    data: input,
  })
}

export const updateMember = ({ id, input }) => {
  return db.member.update({
    data: input,
    where: { id },
  })
}

export const deleteMember = ({ id }) => {
  return db.member.delete({
    where: { id },
  })
}

export const Member = {
  group: (_obj, { root }) =>
    db.member.findUnique({ where: { id: root.id } }).group(),
  attendance: (_obj, { root }) =>
    db.member.findUnique({ where: { id: root.id } }).attendance(),
}

export const membersNoGroup = () => {
  return db.member.findMany({
    where: { groupId: null },
  })
}

export const memberSearchName = ({ nameSearch }) => {
  // const valueSearch = event.target.value
  const resultValueSearch = nameSearch
    .trim()
    .split(' ')
    .map((char) => `+${char}*`)
    .join(' ')
    console.log(resultValueSearch)
  return db.member.findMany({
    where: {
      name: {
        search: resultValueSearch,
      },
    },
    orderBy: { name: 'asc' },
    take: 6,
  })
}
