export const schema = gql`
  type Attendance {
    id: Int!
    activity: Activity!
    activityId: Int!
    member: Member!
    memberId: Int!
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
    memberId: Int!
    present: Boolean!
    submittedBy: String
  }

  input UpdateAttendanceInput {
    activityId: Int
    memberId: Int
    present: Boolean
    submittedBy: String
  }

  type Attendances {
    attendances: [Attendance]
  }
  type Mutation {
    createManyAttendance(input: [CreateAttendanceInput!]!): Attendances @requireAuth
    createAttendance(input: CreateAttendanceInput!): Attendance! @requireAuth
    updateAttendance(id: Int!, input: UpdateAttendanceInput!): Attendance!
      @requireAuth
    deleteAttendance(id: Int!): Attendance! @requireAuth
  }
`
