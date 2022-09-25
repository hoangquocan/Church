import { useMutation } from '@redwoodjs/web'
import { Textarea, Button, Divider, Group } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { useForm } from '@mantine/form'
import { QUERY } from '../QuestionsViewCell'

const UPDATE_QUESTION_MUTATION = gql`
  mutation UpdateQuestionMutation($id: Int!, $input: UpdateQuestionInput!) {
    updateQuestion(id: $id, input: $input) {
      questionOne
      questionTwo
      questionThree
    }
  }
`
const UpdateQuestion = ({ question, handleModal }) => {
  const [updateQuestion] = useMutation(UPDATE_QUESTION_MUTATION, {
    onCompleted: () => {
      showNotification({
        title: 'Questions has been updated!',
        autoClose: 3000,
        radius: 'md',
        containerWidth: '700px',
        styles: (theme) => ({
          root: {
            borderColor: theme.colors.gray[8],
            backgroundColor: theme.colors.gray[7],

            '&::before': { backgroundColor: theme.white },
          },
          title: {
            color: theme.white,
          },
          icon: {
            backgroundColor: theme.white,
            color: theme.white,
          },
          closeButton: {
            color: theme.colors.white,
            '&:hover': {
              color: theme.white,
              backgroundColor: theme.colors.gray[6],
            },
          },
        }),
      }),
      handleModal()
    },
    refetchQueries: [{ query: QUERY}]
  })
  const form = useForm({
    initialValues: {
      questionOne: question.questionOne,
      questionTwo: question.questionTwo,
      questionThree: question.questionThree,
    },
    validate: {
      questionOne: (value) => {
        if (value.length < 10) {
          return 'Please write for Question One'
        } else if (value.length > 191) {
          return 'Please write less than 191 words'
        }
      },
      questionTwo: (value) => {
        if (value.length < 10) {
          return 'Please write for Question One'
        } else if (value.length > 191) {
          return 'Please write less than 191 words'
        }
      },
      questionThree: (value) => {
        if (value.length < 10) {
          return 'Please write for Question One'
        } else if (value.length > 191) {
          return 'Please write less than 191 words'
        }
      },
    },
  })
  const handleUpdate = (values) => {
    updateQuestion({
      variables: { id: question.id, input: { ...values } },
    })
  }
  return (
    <div>
      <Divider size="sm" mb="0px" ml="-20px" mr="-20px" />

      <form  onSubmit={form.onSubmit(handleUpdate)}>
        <Textarea
          label="Question One"
          autosize
          minRows={3}
          autoFocus
          {...form.getInputProps('questionOne')}
        />
        <Textarea
          label="Question Two"
          autosize
          minRows={3}
          {...form.getInputProps('questionTwo')}
        />
        <Textarea
          label="Question Three"
          autosize
          minRows={3}
          {...form.getInputProps('questionThree')}
        />
      <Divider size="sm" mb="20px" mt="10px" ml="-20px" mr="-20px" />
      <Group position="center">
        <Button
          variant="default"
          onClick={handleModal}
          style={{ width: '100px', margin: '6px', fontWeight: '400' }}
        >
          Cancel
        </Button>
        <Button
        type='submit'
          variant="default"
          style={{ width: '100px', margin: '6px', fontWeight: '400' }}
        >
          Update
        </Button>
      </Group>
      </form>
    </div>
  )
}

export default UpdateQuestion
