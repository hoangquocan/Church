export const schema = gql`
  type Report {
    id: Int!
    group: Group!
    groupId: Int!
    question: Question!
    questionId: Int!
    time: String!
    totalActivity: Int!
    totalCompleted: Int!
    percentCompleted: Float!
    totalPresent: Int!
    totalAbsent: Int!
    percentPresent: Float!
    comment: String!
    answerOne: String!
    answerTwo: String!
    answerThree: String!
    createdAt: DateTime!
  }

  type ReportsPortal {
    totalMembers: Int!
    totalMonthMembers: Int!
    totalGroups: Int!
    totalMonthGroups: Int!
    totalActivities: Int!
    totalMonthActivities: Int!
  }

  type Query {
    reportViewByGroup(groupId: Int, time: String): [Report] @requireAuth
    reportsByMonth(timeReport: String): [Report!]! @requireAuth
    reportsPortal(fromMonth: DateTime!, toMonth: DateTime!): ReportsPortal
      @requireAuth
    reportByGroup(groupId: Int!): [Report!] @requireAuth
    reports: [Report!]! @requireAuth
    report(id: Int!): Report @requireAuth
  }

  input CreateReportInput {
    groupId: Int!
    questionId: Int!
    time: String!
    totalActivity: Int!
    totalCompleted: Int!
    percentCompleted: Float!
    totalPresent: Int!
    totalAbsent: Int!
    percentPresent: Float!
    comment: String!
    answerOne: String!
    answerTwo: String!
    answerThree: String!
  }

  input UpdateReportInput {
    groupId: Int
    questionId: Int
    time: String
    totalActivity: Int
    totalCompleted: Int
    percentCompleted: Float
    totalPresent: Int
    totalAbsent: Int
    percentPresent: Float
    comment: String
    answerOne: String
    answerTwo: String
    answerThree: String
  }

  type Mutation {
    createReport(input: CreateReportInput!): Report! @requireAuth
    updateReport(id: Int!, input: UpdateReportInput!): Report! @requireAuth
    deleteReport(id: Int!): Report! @requireAuth
  }
`
