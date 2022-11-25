import { db } from 'src/lib/db'

const ACTIVITIES_PER_PAGE = 12

export const activitiesPage = ({ page = 1 }) => {
  const offset = (page - 1) * ACTIVITIES_PER_PAGE
  return {
    activities: db.activity.findMany({
      take: ACTIVITIES_PER_PAGE,
      skip: offset,
      orderBy: { date: 'desc' },
    }),
    count: db.activity.count(),
  }
}
export const totalActivities = () => {
  return db.activity.count()
}

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

export const upcomingActivities = ({ groupId, time }) => {
  return db.activity.findMany({
    where: {
      AND: [{ groupId }, { attendance: { none: {} } }, { date: { gte: time } }],
    },
    orderBy: { date: 'asc' },
    take: 3,
  })
}

export const activitiesOutOfDate = ({ time }) => {
  return db.activity.findMany({
    where: {
      AND: [{ attendance: { none: {} } }, { date: { lt: time } }],
    },
    orderBy: { date: 'asc' },
  })
}
export const recentActivity = ({ groupId }) => {
  return db.activity.findMany({
    where: {
      groupId,
      // AND: [{ groupId }, { urlAttendance: { not: null } }],
      NOT: [{ attendance: { none: {} } }],
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

export const createManyActivities = ({ input }) => {
  return db.activity.createMany({
    data: input,
  })
}

export const activitiesQuarter = ({ month, year }) => {
  return db.$queryRaw`SELECT * FROM Activity WHERE MONTH(date)>=${month} && MONTH(date)<=${
    month + 2
  } && YEAR(date)=${year}`
}
