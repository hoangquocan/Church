export const schema = gql`
  type Group {
    id: Int!
    name: String!
    members: [Member]!
    leader: User!
    userId: Int!
    reports: [Report]!
    activities: [Activity]!
    createdAt: DateTime!
  }

  type Query {
    groups: [Group!]! @requireAuth
    group(id: Int!): Group @requireAuth
  }

  input CreateGroupInput {
    name: String!
    userId: Int!
  }

  input UpdateGroupInput {
    name: String
    userId: Int
  }

  type Mutation {
    createGroup(input: CreateGroupInput!): Group! @requireAuth
    updateGroup(id: Int!, input: UpdateGroupInput!): Group! @requireAuth
    deleteGroup(id: Int!): Group! @requireAuth
  }
`
