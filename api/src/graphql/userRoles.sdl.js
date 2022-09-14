export const schema = gql`
  type UserRole {
    id: Int!
    name: String!
    user: User
    # userId: Int!
  }

  type Query {
    usersLeader: [UserRole!]! @requireAuth
    userRoles: [UserRole!]! @requireAuth
    userRole(id: Int!): UserRole @requireAuth
  }

  input CreateUserRoleInput {
    name: String!
    # userId: Int!
  }

  input UpdateUserRoleInput {
    name: String
    userId: Int
  }

  type Mutation {
    createUserRole(input: CreateUserRoleInput!, email: String): UserRole! @requireAuth
    updateUserRole(id: Int!, input: UpdateUserRoleInput!): UserRole!
      @requireAuth
    deleteUserRole(id: Int!): UserRole! @requireAuth
  }
`
