export const schema = gql`
  type Question {
    id: Int!
    time: DateTime!
    questionOne: String!
    questionTwo: String!
    questionThree: String!
    reports: [Report]!
    createdAt: DateTime!
  }

  type Query {
    questions: [Question!]! @requireAuth
    questionsView: [Question!]! @requireAuth
    question(id: Int!): Question @requireAuth
    questionByMonth(month: DateTime!): Question @requireAuth
  }

  input CreateQuestionInput {
    time: DateTime!
    questionOne: String!
    questionTwo: String!
    questionThree: String!
  }

  input UpdateQuestionInput {
    time: DateTime
    questionOne: String
    questionTwo: String
    questionThree: String
  }

  type Mutation {
    createQuestion(input: CreateQuestionInput!): Question! @requireAuth
    updateQuestion(id: Int!, input: UpdateQuestionInput!): Question!
      @requireAuth
    deleteQuestion(id: Int!): Question! @requireAuth
  }
`
