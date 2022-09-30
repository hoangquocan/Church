import { db } from 'src/lib/db'

export const audits = () => {
  return db.audit.findMany()
}

export const audit = ({ id }) => {
  return db.audit.findUnique({
    where: { id },
  })
}

export const createAudit = ({ input }) => {
  return db.audit.create({
    data: input,
  })
}

export const updateAudit = ({ id, input }) => {
  return db.audit.update({
    data: input,
    where: { id },
  })
}

export const deleteAudit = ({ id }) => {
  return db.audit.delete({
    where: { id },
  })
}

export const Audit = {
  user: (_obj, { root }) =>
    db.audit.findUnique({ where: { id: root.id } }).user(),
}
