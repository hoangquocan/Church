import {
  reports,
  report,
  createReport,
  updateReport,
  deleteReport,
} from './reports'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('reports', () => {
  scenario('returns all reports', async (scenario) => {
    const result = await reports()

    expect(result.length).toEqual(Object.keys(scenario.report).length)
  })

  scenario('returns a single report', async (scenario) => {
    const result = await report({ id: scenario.report.one.id })

    expect(result).toEqual(scenario.report.one)
  })

  scenario('creates a report', async (scenario) => {
    const result = await createReport({
      input: {
        groupId: scenario.report.two.groupId,
        questionId: scenario.report.two.questionId,
        time: 'String',
        totalActivity: 8228344,
        totalCompleted: 2311171,
        percentCompleted: 2184688.498146714,
        totalPresent: 5189149,
        totalAbsent: 3738051,
        percentPresent: 9809054.976008238,
        comment: 'String',
        answerOne: 'String',
        answerTwo: 'String',
        answerThree: 'String',
      },
    })

    expect(result.groupId).toEqual(scenario.report.two.groupId)
    expect(result.questionId).toEqual(scenario.report.two.questionId)
    expect(result.time).toEqual('String')
    expect(result.totalActivity).toEqual(8228344)
    expect(result.totalCompleted).toEqual(2311171)
    expect(result.percentCompleted).toEqual(2184688.498146714)
    expect(result.totalPresent).toEqual(5189149)
    expect(result.totalAbsent).toEqual(3738051)
    expect(result.percentPresent).toEqual(9809054.976008238)
    expect(result.comment).toEqual('String')
    expect(result.answerOne).toEqual('String')
    expect(result.answerTwo).toEqual('String')
    expect(result.answerThree).toEqual('String')
  })

  scenario('updates a report', async (scenario) => {
    const original = await report({ id: scenario.report.one.id })
    const result = await updateReport({
      id: original.id,
      input: { time: 'String2' },
    })

    expect(result.time).toEqual('String2')
  })

  scenario('deletes a report', async (scenario) => {
    const original = await deleteReport({ id: scenario.report.one.id })
    const result = await report({ id: original.id })

    expect(result).toEqual(null)
  })
})
