import { db } from 'src/lib/db'

export const reports = () => {
  return db.report.findMany()
}

export const report = ({ id }) => {
  return db.report.findUnique({
    where: { id },
  })
}

export const createReport = ({ input }) => {
  return db.report.create({
    data: input,
  })
}

export const updateReport = ({ id, input }) => {
  return db.report.update({
    data: input,
    where: { id },
  })
}

export const deleteReport = ({ id }) => {
  return db.report.delete({
    where: { id },
  })
}

export const Report = {
  group: (_obj, { root }) =>
    db.report.findUnique({ where: { id: root.id } }).group(),
}

export const reportByGroup = ({ groupId }) => {
  return db.report.findMany({
    where: { groupId },
    select: {
      time: true,
    },
  })
}

export const reportsPortal = ({ fromMonth, toMonth }) => {
  return {
    totalMembers: db.member.count(),
    totalMonthMembers: db.member.count({
      where: {
        AND: [
          { createdAt: { gte: fromMonth } },
          { createdAt: { lte: toMonth } },
        ],
      },
    }),
    totalGroups: db.group.count(),
    totalMonthGroups: db.group.count({
      where: {
        AND: [
          { createdAt: { gte: fromMonth } },
          { createdAt: { lte: toMonth } },
        ],
      },
    }),
    totalActivities: db.activity.count(),
    totalMonthActivities: db.activity.count({
      where: {
        AND: [{ date: { gte: fromMonth } }, { date: { lte: toMonth } }],
      },
    }),
  }
}

export const reportsByMonth = ({ timeReport }) => {
  return db.report.findMany({
    where: {
      time: { equals: timeReport },
    },
  })
}
