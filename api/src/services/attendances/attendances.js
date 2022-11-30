import { db } from 'src/lib/db'

export const attendances = () => {
  return db.attendance.findMany()
}

export const attendance = ({ id }) => {
  return db.attendance.findUnique({
    where: { id },
  })
}

export const createAttendance = ({ input }) => {
  return db.attendance.create({
    data: input,
  })
}

export const updateAttendance = ({ id, input }) => {
  return db.attendance.update({
    data: input,
    where: { id },
  })
}

export const deleteAttendance = ({ id }) => {
  return db.attendance.delete({
    where: { id },
  })
}
export const deleteAttenOf = ({ memberId }) => {
console.log(memberId)
  return db.attendance.deleteMany({
    where: { memberId: memberId },
  })
}
export const Attendance = {
  activity: (_obj, { root }) =>
    db.attendance.findUnique({ where: { id: root.id } }).activity(),
  member: (_obj, { root }) =>
    db.attendance.findUnique({ where: { id: root.id } }).member(),
}

export const createManyAttendance = ({ input }) => {
  return db.attendance.createMany({
    data: input,
  })
}

// export const attendanceByDate = ({ startDate, endDate, groupId }) => {
//   return db.attendance.findMany({
//     where: {
//       activity: {
//         AND: [
//           { groupId: { equals: groupId } },
//           { date: { gte: startDate } },
//           { date: { lte: endDate } },
//         ],
//       },
//     },
//     include: {
//       _count: {
//         select: { present: true },
//       },
//     },
//   })
// }
