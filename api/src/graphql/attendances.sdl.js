export const schema = gql`
  type Attendance {
    id: Int!
    activity: Activity!
    activityId: Int!
    member: Member!
    groupId: Int!
    present: Boolean!
    submittedBy: String
    createdAt: DateTime!
  }

  type Query {
    attendances: [Attendance!]! @requireAuth
    attendance(id: Int!): Attendance @requireAuth
  }

  input CreateAttendanceInput {
    activityId: Int!
    groupId: Int!
    present: Boolean!
    submittedBy: String
  }

  input UpdateAttendanceInput {
    activityId: Int
    groupId: Int
    present: Boolean
    submittedBy: String
  }

  type Mutation {
    createAttendance(input: CreateAttendanceInput!): Attendance! @requireAuth
    updateAttendance(id: Int!, input: UpdateAttendanceInput!): Attendance!
      @requireAuth
    deleteAttendance(id: Int!): Attendance! @requireAuth
  }
`
