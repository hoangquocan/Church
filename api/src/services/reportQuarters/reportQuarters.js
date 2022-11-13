import { db } from 'src/lib/db'

export const reportQuarters = () => {
  return db.reportQuarter.findMany()
}

export const reportQuarter = ({ id }) => {
  return db.reportQuarter.findUnique({
    where: { id },
  })
}

export const createReportQuarter = ({ input }) => {
  return db.reportQuarter.create({
    data: input,
  })
}

export const updateReportQuarter = ({ id, input }) => {
  return db.reportQuarter.update({
    data: input,
    where: { id },
  })
}

export const deleteReportQuarter = ({ id }) => {
  return db.reportQuarter.delete({
    where: { id },
  })
}

export const ReportQuarter = {
  group: (_obj, { root }) =>
    db.reportQuarter.findUnique({ where: { id: root.id } }).group(),
}
