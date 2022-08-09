import { db } from 'src/lib/db'

export const members = () => {
  return db.member.findMany()
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
    where: { groupId: null}
  })
}