import { db } from 'src/lib/db'

const GROUPS_PER_PAGE = 15

export const groupsPage = ({ page = 1 }) => {
  const offset = (page - 1) * GROUPS_PER_PAGE
  return db.group.findMany({
    take: GROUPS_PER_PAGE,
    skip: offset,
    orderBy: [{ name: 'asc' }, { createdAt: 'asc' }],
  })
}

export const totalGroups = () => {
  return db.group.count()
}

export const groups = () => {
  return db.group.findMany({
    orderBy: [{ name: 'asc' }, { createdAt: 'asc' }],
  })
}

export const group = ({ id }) => {
  return db.group.findUnique({
    where: { id },
  })
}

export const createGroup = ({ input }) => {
  return db.group.create({
    data: input,
  })
}

export const updateGroup = ({ id, input }) => {
  return db.group.update({
    data: input,
    where: { id },
  })
}

export const deleteGroup = ({ id }) => {
  return db.group.delete({
    where: { id },
  })
}

export const Group = {
  members: (_obj, { root }) =>
    db.group.findUnique({ where: { id: root.id } }).members(),
  leader: (_obj, { root }) =>
    db.group.findUnique({ where: { id: root.id } }).leader(),
  reports: (_obj, { root }) =>
    db.group.findUnique({ where: { id: root.id } }).reports(),
  reportQuarters: (_obj, { root }) =>
    db.group.findUnique({ where: { id: root.id } }).reportQuarters(),
  activities: (_obj, { root }) =>
    db.group.findUnique({ where: { id: root.id } }).activities(),
}
