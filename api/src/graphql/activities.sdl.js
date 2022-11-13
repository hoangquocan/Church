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
  type Activities {
    activities: [Activity]
  }
  type ActivitiesPage {
    activities: [Activity!]!
    count: Int!
  }
  type Query {
    totalActivities: Int @requireAuth
    activitiesPage(page: Int): ActivitiesPage @requireAuth
    activitiesQuarter(month: Int, year: Int): [Activity!]! @requireAuth
    recentActivity(groupId: Int): [Activity!]! @requireAuth
    upcomingActivities(groupId: Int, time: DateTime): [Activity!]! @requireAuth
    activitiesOutOfDate(time: DateTime): [Activity!]! @requireAuth
    activityInGroupByDate(
      groupId: Int
      fromDate: DateTime
      toDate: DateTime
    ): [Activity] @requireAuth
    activityNotAtten: [Activity!]! @requireAuth
    activities: [Activity!]! @requireAuth
    activity(id: Int!): Activity @requireAuth
    viewAttendanced(
      groupId: Int
      fromDate: DateTime
      toDate: DateTime
    ): [Activity!]! @requireAuth
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
    createManyActivities(input: [CreateActivityInput!]!): Activities
      @requireAuth
    createActivity(input: CreateActivityInput!): Activity! @requireAuth
    updateActivity(id: Int!, input: UpdateActivityInput!): Activity!
      @requireAuth
    deleteActivity(id: Int!): Activity!
      @requireAuth(roles: ["admin", "manager"])
  }
`
