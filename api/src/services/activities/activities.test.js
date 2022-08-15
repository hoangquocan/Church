import {
  activities,
  activity,
  createActivity,
  updateActivity,
  deleteActivity,
} from './activities'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('activities', () => {
  scenario('returns all activities', async (scenario) => {
    const result = await activities()

    expect(result.length).toEqual(Object.keys(scenario.activity).length)
  })

  scenario('returns a single activity', async (scenario) => {
    const result = await activity({ id: scenario.activity.one.id })

    expect(result).toEqual(scenario.activity.one)
  })

  scenario('creates a activity', async (scenario) => {
    const result = await createActivity({
      input: {
        name: 'String',
        date: '2022-08-12T11:30:23Z',
        groupId: scenario.activity.two.groupId,
      },
    })

    expect(result.name).toEqual('String')
    expect(result.date).toEqual('2022-08-12T11:30:23Z')
    expect(result.groupId).toEqual(scenario.activity.two.groupId)
  })

  scenario('updates a activity', async (scenario) => {
    const original = await activity({ id: scenario.activity.one.id })
    const result = await updateActivity({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a activity', async (scenario) => {
    const original = await deleteActivity({ id: scenario.activity.one.id })
    const result = await activity({ id: original.id })

    expect(result).toEqual(null)
  })
})
