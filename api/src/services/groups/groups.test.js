import { groups, group, createGroup, updateGroup, deleteGroup } from './groups'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('groups', () => {
  scenario('returns all groups', async (scenario) => {
    const result = await groups()

    expect(result.length).toEqual(Object.keys(scenario.group).length)
  })

  scenario('returns a single group', async (scenario) => {
    const result = await group({ id: scenario.group.one.id })

    expect(result).toEqual(scenario.group.one)
  })

  scenario('creates a group', async () => {
    const result = await createGroup({
      input: { name: 'String6182332', leader: 'String' },
    })

    expect(result.name).toEqual('String6182332')
    expect(result.leader).toEqual('String')
  })

  scenario('updates a group', async (scenario) => {
    const original = await group({ id: scenario.group.one.id })
    const result = await updateGroup({
      id: original.id,
      input: { name: 'String11193112' },
    })

    expect(result.name).toEqual('String11193112')
  })

  scenario('deletes a group', async (scenario) => {
    const original = await deleteGroup({ id: scenario.group.one.id })
    const result = await group({ id: original.id })

    expect(result).toEqual(null)
  })
})
