export const schema = gql`
  type Group {
    id: Int!
    name: String!
    members: [Member]!
    leader: String!
    activities: [Activity]!
    createdAt: DateTime!
  }

  type members {
    members: [Member!]!
  }
  type Query {
    groupMembers(id: Int!): members @requireAuth
    groups: [Group!]! @requireAuth
    group(id: Int!): Group @requireAuth
  }

  input CreateGroupInput {
    name: String!
    leader: String!
  }

  input UpdateGroupInput {
    name: String
    leader: String
  }

  type Mutation {
    createGroup(input: CreateGroupInput!): Group! @requireAuth
    updateGroup(id: Int!, input: UpdateGroupInput!): Group! @requireAuth
    deleteGroup(id: Int!): Group! @requireAuth
  }
`
