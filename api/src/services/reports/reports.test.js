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
        time: '2022-08-30T02:23:47Z',
        totalActivity: 317194,
        totalCompleted: 1926431,
        percentCompleted: 5661231.800782682,
        totalPresent: 9609650,
        totalAbsent: 4633005,
        percentPresent: 7514899.926741186,
        comment: 'String',
      },
    })

    expect(result.groupId).toEqual(scenario.report.two.groupId)
    expect(result.time).toEqual('2022-08-30T02:23:47Z')
    expect(result.totalActivity).toEqual(317194)
    expect(result.totalCompleted).toEqual(1926431)
    expect(result.percentCompleted).toEqual(5661231.800782682)
    expect(result.totalPresent).toEqual(9609650)
    expect(result.totalAbsent).toEqual(4633005)
    expect(result.percentPresent).toEqual(7514899.926741186)
    expect(result.comment).toEqual('String')
  })

  scenario('updates a report', async (scenario) => {
    const original = await report({ id: scenario.report.one.id })
    const result = await updateReport({
      id: original.id,
      input: { time: '2022-08-31T02:23:47Z' },
    })

    expect(result.time).toEqual('2022-08-31T02:23:47Z')
  })

  scenario('deletes a report', async (scenario) => {
    const original = await deleteReport({ id: scenario.report.one.id })
    const result = await report({ id: original.id })

    expect(result).toEqual(null)
  })
})
