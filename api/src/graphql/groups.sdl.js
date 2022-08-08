export const schema = gql`
  type Group {
    id: Int!
    name: String!
    member: [Member]!
    leader: String!
    createdAt: DateTime!
  }

  type Query {
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
    createGroup(input: CreateGroupInput!): Group! @requireAuth(roles: ["admin"])
    updateGroup(id: Int!, input: UpdateGroupInput!): Group! @requireAuth
    deleteGroup(id: Int!): Group! @requireAuth
  }
`
