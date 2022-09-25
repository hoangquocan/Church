import { db } from 'src/lib/db'

export const activities = () => {
  return db.activity.findMany({
    orderBy: { date: 'desc' },
  })
}

export const activity = ({ id }) => {
  return db.activity.findUnique({
    where: { id },
  })
}

export const createActivity = ({ input }) => {
  return db.activity.create({
    data: input,
  })
}

export const updateActivity = ({ id, input }) => {
  return db.activity.update({
    data: input,
    where: { id },
  })
}

export const deleteActivity = ({ id }) => {
  return db.activity.delete({
    where: { id },
  })
}

export const Activity = {
  group: (_obj, { root }) =>
    db.activity.findUnique({ where: { id: root.id } }).group(),
  attendance: (_obj, { root }) =>
    db.activity.findUnique({ where: { id: root.id } }).attendance(),
}

export const activityNotAtten = () => {
  return db.activity.findMany({
    where: { attendance: { none: {} } },
  })
}

export const activityInGroupByDate = ({ groupId, fromDate, toDate }) => {
  return db.activity.findMany({
    where: {
      AND: [
        { groupId },
        { date: { gte: fromDate } },
        { date: { lte: toDate } },
      ],
    },
  })
}

export const activitiesHome = ({ groupId }) => {
  return db.activity.findMany({
    where: {
      NOT: [{ attendance: { none: {} } }],
    },
    orderBy: { date: 'desc' },
    take: 4,
  })
}

export const upcomingActivities = ({ groupId, time }) => {
  return db.activity.findMany({
    where: {
      AND: [{ groupId }, { attendance: { none: {} } }, { date: { gte: time } }],
    },
    orderBy: { date: 'asc' },
    take: 3,
  })
}

export const recentActivity = ({ groupId }) => {
  return db.activity.findMany({
    where: {
      AND: [{ groupId }, { urlAttendance: { not: null } }],
    },
    orderBy: { date: 'desc' },
    take: 3,
  })
}

export const viewAttendanced = ({ groupId, fromDate, toDate }) => {
  return db.activity.findMany({
    where: {
      AND: [
        { groupId },
        { date: { gte: fromDate } },
        { date: { lte: toDate } },
      ],
      NOT: [{ attendance: { none: {} } }],
    },
    orderBy: { date: 'desc' },
  })
}
