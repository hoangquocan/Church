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

export const Attendance = {
  activity: (_obj, { root }) =>
    db.attendance.findUnique({ where: { id: root.id } }).activity(),
  member: (_obj, { root }) =>
    db.attendance.findUnique({ where: { id: root.id } }).member(),
}
