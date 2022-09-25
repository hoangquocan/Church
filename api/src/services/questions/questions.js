import { db } from 'src/lib/db'

export const questions = () => {
  return db.question.findMany()
}

export const questionsView = () => {
  return db.question.findMany({
    orderBy: { time: 'desc' },
    take: 5,
  })
}

export const question = ({ id }) => {
  return db.question.findUnique({
    where: { id },
  })
}

export const questionByMonth = ({ month }) => {
  return db.question.findUnique({
    where: {
      time: month,
    },
  })
}

export const createQuestion = ({ input }) => {
  return db.question.create({
    data: input,
  })
}

export const updateQuestion = ({ id, input }) => {
  return db.question.update({
    data: input,
    where: { id },
  })
}

export const deleteQuestion = ({ id }) => {
  return db.question.delete({
    where: { id },
  })
}

export const Question = {
  reports: (_obj, { root }) =>
    db.question.findUnique({ where: { id: root.id } }).reports(),
}
