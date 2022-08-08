import {
  members,
  member,
  createMember,
  updateMember,
  deleteMember,
} from './members'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('members', () => {
  scenario('returns all members', async (scenario) => {
    const result = await members()

    expect(result.length).toEqual(Object.keys(scenario.member).length)
  })

  scenario('returns a single member', async (scenario) => {
    const result = await member({ id: scenario.member.one.id })

    expect(result).toEqual(scenario.member.one)
  })

  scenario('creates a member', async () => {
    const result = await createMember({
      input: {
        name: 'String',
        birthDate: '2022-08-05T16:00:11Z',
        phoneNumber: 'String',
        email: 'String',
        address: 'String',
      },
    })

    expect(result.name).toEqual('String')
    expect(result.birthDate).toEqual('2022-08-05T16:00:11Z')
    expect(result.phoneNumber).toEqual('String')
    expect(result.email).toEqual('String')
    expect(result.address).toEqual('String')
  })

  scenario('updates a member', async (scenario) => {
    const original = await member({ id: scenario.member.one.id })
    const result = await updateMember({
      id: original.id,
      input: { name: 'String2' },
    })

    expect(result.name).toEqual('String2')
  })

  scenario('deletes a member', async (scenario) => {
    const original = await deleteMember({ id: scenario.member.one.id })
    const result = await member({ id: original.id })

    expect(result).toEqual(null)
  })
})
