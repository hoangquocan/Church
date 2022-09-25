export const schema = gql`
  type Activity {
    id: Int!
    name: String!
    date: DateTime!
    group: Group!
    groupId: Int!
    urlAttendance: String
    attendance: [Attendance]!
    createdAt: DateTime!
  }
  # type activityInGroup {
  #   activities: [Activity!]!
  # }

  type Query {
    recentActivity(groupId: Int): [Activity!]! @requireAuth
    upcomingActivities(groupId: Int, time: DateTime): [Activity!]! @requireAuth
    activitiesHome: [Activity!]! @requireAuth
    activityInGroupByDate(groupId: Int, fromDate: DateTime, toDate: DateTime ) : [Activity] @requireAuth
    activityNotAtten: [Activity!]! @requireAuth
    activities: [Activity!]! @requireAuth
    activity(id: Int!): Activity @requireAuth
    viewAttendanced(groupId: Int, fromDate: DateTime, toDate: DateTime): [Activity!]! @requireAuth
  }

  input CreateActivityInput {
    name: String!
    date: DateTime!
    groupId: Int!
  }

  input UpdateActivityInput {
    name: String
    date: DateTime
    groupId: Int
    urlAttendance: String
  }
  type Mutation {
    createActivity(input: CreateActivityInput!): Activity! @requireAuth
    updateActivity(id: Int!, input: UpdateActivityInput!): Activity!
      @requireAuth
    deleteActivity(id: Int!): Activity! @requireAuth
  }
`
