import {
  questions,
  question,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from './questions'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('questions', () => {
  scenario('returns all questions', async (scenario) => {
    const result = await questions()

    expect(result.length).toEqual(Object.keys(scenario.question).length)
  })

  scenario('returns a single question', async (scenario) => {
    const result = await question({ id: scenario.question.one.id })

    expect(result).toEqual(scenario.question.one)
  })

  scenario('creates a question', async () => {
    const result = await createQuestion({
      input: {
        time: '2022-09-14T13:38:02Z',
        questionOne: 'String',
        questionTwo: 'String',
        questionThree: 'String',
      },
    })

    expect(result.time).toEqual('2022-09-14T13:38:02Z')
    expect(result.questionOne).toEqual('String')
    expect(result.questionTwo).toEqual('String')
    expect(result.questionThree).toEqual('String')
  })

  scenario('updates a question', async (scenario) => {
    const original = await question({ id: scenario.question.one.id })
    const result = await updateQuestion({
      id: original.id,
      input: { time: '2022-09-15T13:38:02Z' },
    })

    expect(result.time).toEqual('2022-09-15T13:38:02Z')
  })

  scenario('deletes a question', async (scenario) => {
    const original = await deleteQuestion({ id: scenario.question.one.id })
    const result = await question({ id: original.id })

    expect(result).toEqual(null)
  })
})
