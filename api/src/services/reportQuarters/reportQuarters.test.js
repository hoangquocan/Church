import {
  reportQuarters,
  reportQuarter,
  createReportQuarter,
  updateReportQuarter,
  deleteReportQuarter,
} from './reportQuarters'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('reportQuarters', () => {
  scenario('returns all reportQuarters', async (scenario) => {
    const result = await reportQuarters()

    expect(result.length).toEqual(Object.keys(scenario.reportQuarter).length)
  })

  scenario('returns a single reportQuarter', async (scenario) => {
    const result = await reportQuarter({ id: scenario.reportQuarter.one.id })

    expect(result).toEqual(scenario.reportQuarter.one)
  })

  scenario('creates a reportQuarter', async () => {
    const result = await createReportQuarter({
      input: {
        timeQuarter: 'String',
        totalAttendance: 861792,
        totalPresent: 776552,
        percentPrecent: 9480220.473967312,
      },
    })

    expect(result.timeQuarter).toEqual('String')
    expect(result.totalAttendance).toEqual(861792)
    expect(result.totalPresent).toEqual(776552)
    expect(result.percentPrecent).toEqual(9480220.473967312)
  })

  scenario('updates a reportQuarter', async (scenario) => {
    const original = await reportQuarter({ id: scenario.reportQuarter.one.id })
    const result = await updateReportQuarter({
      id: original.id,
      input: { timeQuarter: 'String2' },
    })

    expect(result.timeQuarter).toEqual('String2')
  })

  scenario('deletes a reportQuarter', async (scenario) => {
    const original = await deleteReportQuarter({
      id: scenario.reportQuarter.one.id,
    })

    const result = await reportQuarter({ id: original.id })

    expect(result).toEqual(null)
  })
})
