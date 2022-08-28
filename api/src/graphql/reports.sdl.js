export const schema = gql`
  type Report {
    id: Int!
    group: Group!
    groupId: Int!
    time: DateTime!
    totalActivity: Int!
    presentTrue: Int!
    presentFalse: Int!
    percentPresent: Float!
    comment: String!
  }

  type Query {
    reports: [Report!]! @requireAuth
    report(id: Int!): Report @requireAuth
  }

  input CreateReportInput {
    groupId: Int!
    time: DateTime!
    totalActivity: Int!
    presentTrue: Int!
    presentFalse: Int!
    percentPresent: Float!
    comment: String!
  }

  input UpdateReportInput {
    groupId: Int
    time: DateTime
    totalActivity: Int
    presentTrue: Int
    presentFalse: Int
    percentPresent: Float
    comment: String
  }

  type Mutation {
    createReport(input: CreateReportInput!): Report! @requireAuth
    updateReport(id: Int!, input: UpdateReportInput!): Report! @requireAuth
    deleteReport(id: Int!): Report! @requireAuth
  }
`
