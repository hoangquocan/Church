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
        time: '2022-08-26T11:12:00Z',
        totalActivity: 7182492,
        presentTrue: 8201804,
        presentFalse: 5986390,
        percentPresent: 8831891.114245769,
        comment: 'String',
      },
    })

    expect(result.groupId).toEqual(scenario.report.two.groupId)
    expect(result.time).toEqual('2022-08-26T11:12:00Z')
    expect(result.totalActivity).toEqual(7182492)
    expect(result.presentTrue).toEqual(8201804)
    expect(result.presentFalse).toEqual(5986390)
    expect(result.percentPresent).toEqual(8831891.114245769)
    expect(result.comment).toEqual('String')
  })

  scenario('updates a report', async (scenario) => {
    const original = await report({ id: scenario.report.one.id })
    const result = await updateReport({
      id: original.id,
      input: { time: '2022-08-27T11:12:00Z' },
    })

    expect(result.time).toEqual('2022-08-27T11:12:00Z')
  })

  scenario('deletes a report', async (scenario) => {
    const original = await deleteReport({ id: scenario.report.one.id })
    const result = await report({ id: original.id })

    expect(result).toEqual(null)
  })
})
