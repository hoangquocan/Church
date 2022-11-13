import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany({
    where: {
      NOT: { email: { equals: 'hoangquocan91@gmail.com' } },
    },
  })
}

export const usersExist = () => {
  return db.user.findMany()
}

export const user = ({ email }) => {
  return db.user.findUnique({
    where: { email },
  })
}

export const createUser = ({ input }) => {
  return db.user.create({
    data: input,
  })
}

export const updateUser = ({ id, input }) => {
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const User = {
  userRoles: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).userRoles(),
  group: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).group(),
}

export const usersHasRole = () => {
  return db.$queryRaw`SELECT * FROM User WHERE EXISTS ( SELECT * FROM UserRole WHERE UserRole.userId = User.id AND (name = 'manager' OR name = 'leader'))`
}

export const leaderNoGroup = () => {
  return db.user.findMany({
    where: {
      AND: [
        {
          userRoles: {
            some: { name: { contains: 'leader' } },
          },
        },
        { group: { is: null } },
      ],
    },
  })
}

