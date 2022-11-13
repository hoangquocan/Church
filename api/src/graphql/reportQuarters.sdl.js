export const schema = gql`
  type ReportQuarter {
    id: Int!
    timeQuarter: String!
    group: Group
    groupId: Int
    totalAttendance: Int!
    totalPresent: Int!
    percentPrecent: Float!
    createdAt: DateTime!
  }

  type Query {
    reportQuarters: [ReportQuarter!]! @requireAuth
    reportQuarter(id: Int!): ReportQuarter @requireAuth
  }

  input CreateReportQuarterInput {
    timeQuarter: String!
    groupId: Int
    totalAttendance: Int!
    totalPresent: Int!
    percentPrecent: Float!
  }

  input UpdateReportQuarterInput {
    timeQuarter: String
    groupId: Int
    totalAttendance: Int
    totalPresent: Int
    percentPrecent: Float
  }

  type Mutation {
    createReportQuarter(input: CreateReportQuarterInput!): ReportQuarter!
      @requireAuth
    updateReportQuarter(
      id: Int!
      input: UpdateReportQuarterInput!
    ): ReportQuarter! @requireAuth
    deleteReportQuarter(id: Int!): ReportQuarter! @requireAuth
  }
`
