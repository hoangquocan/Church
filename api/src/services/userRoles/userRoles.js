import { db } from 'src/lib/db'

export const userRoles = () => {
  return db.userRole.findMany()
}

export const userRole = ({ id }) => {
  return db.userRole.findUnique({
    where: { id },
  })
}

export const createUserRole = ({ input, email }) => {
  return db.userRole.create({
    data: {
      ...input,
      user: {
        connect: { email },
      },
    },
  })
}

export const updateUserRole = ({ id, input }) => {
  return db.userRole.update({
    data: input,
    where: { id },
  })
}

export const deleteUserRole = ({ id }) => {
  return db.userRole.delete({
    where: { id },
  })
}

export const UserRole = {
  user: (_obj, { root }) =>
    db.userRole.findUnique({ where: { id: root.id } }).user(),
}

export const usersLeader = () => {
  return db.userRole.findMany({
    where: {
      name: { equals: 'leader' },
    },
  })
}
