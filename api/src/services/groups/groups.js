import { db } from 'src/lib/db'

export const groups = () => {
  return db.group.findMany({
    orderBy: { name : 'asc'}
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
  activities: (_obj, { root }) =>
    db.group.findUnique({ where: { id: root.id } }).activities(),
}
