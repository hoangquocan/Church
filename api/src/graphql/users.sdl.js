export const schema = gql`
  type User {
    id: Int!
    name: String
    email: String!
    avatar: String
    bio: String
    userRoles: [UserRole]!
    group: Group
    audits: [Audit]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    usersHasRole: [User!]! @requireAuth
    usersExist: [User!]! @skipAuth
    users: [User!]! @requireAuth
    user(email: String): User @requireAuth
  }

  input CreateUserInput {
    name: String
    email: String!
    avatar: String
    bio: String
  }

  input UpdateUserInput {
    name: String
    email: String
    avatar: String
    bio: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
    emailUser(id: Int!): User! @requireAuth
  }
`
