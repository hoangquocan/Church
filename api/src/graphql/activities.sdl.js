export const schema = gql`
  type Activity {
    id: Int!
    name: String!
    date: DateTime!
    group: Group!
    groupId: Int!
    attendance: [Attendance]!
    createdAt: DateTime!
  }

  type Query {
    activityNotAtten: [Activity!]! @requireAuth
    activities: [Activity!]! @requireAuth
    activity(id: Int!): Activity @requireAuth
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
  }
  type Mutation {
    createActivity(input: CreateActivityInput!): Activity! @requireAuth
    updateActivity(id: Int!, input: UpdateActivityInput!): Activity!
      @requireAuth
    deleteActivity(id: Int!): Activity! @requireAuth
  }
`
