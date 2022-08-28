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
