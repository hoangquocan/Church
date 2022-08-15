import {
  attendances,
  attendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} from './attendances'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('attendances', () => {
  scenario('returns all attendances', async (scenario) => {
    const result = await attendances()

    expect(result.length).toEqual(Object.keys(scenario.attendance).length)
  })

  scenario('returns a single attendance', async (scenario) => {
    const result = await attendance({ id: scenario.attendance.one.id })

    expect(result).toEqual(scenario.attendance.one)
  })

  scenario('creates a attendance', async (scenario) => {
    const result = await createAttendance({
      input: {
        activityId: scenario.attendance.two.activityId,
        memberId: scenario.attendance.two.memberId,
        present: true,
      },
    })

    expect(result.activityId).toEqual(scenario.attendance.two.activityId)
    expect(result.memberId).toEqual(scenario.attendance.two.memberId)
    expect(result.present).toEqual(true)
  })

  scenario('updates a attendance', async (scenario) => {
    const original = await attendance({ id: scenario.attendance.one.id })
    const result = await updateAttendance({
      id: original.id,
      input: { present: false },
    })

    expect(result.present).toEqual(false)
  })

  scenario('deletes a attendance', async (scenario) => {
    const original = await deleteAttendance({ id: scenario.attendance.one.id })
    const result = await attendance({ id: original.id })

    expect(result).toEqual(null)
  })
})
