export const schema = gql`
  type Member {
    id: Int!
    name: String!
    birthDate: DateTime!
    phoneNumber: String!
    email: String!
    address: String!
    urlAvatar: String
    group: Group
    groupId: Int
    attendance: [Attendance]!
    createdAt: DateTime!
  }
  type GroupMember {
    group: [Group!]
  }
  type MembersLoad {
    members: [Member!]!
    count: Int!
  }
  type Query {
    memberSearchName(nameSearch: String): [Member!]! @requireAuth
    membersLoad(load: Int): MembersLoad @requireAuth
    membersNoGroup: [Member!]! @requireAuth
    members: [Member!]! @requireAuth
    member(id: Int!): Member @requireAuth
  }

  input CreateMemberInput {
    name: String!
    birthDate: DateTime!
    phoneNumber: String!
    email: String!
    address: String!
    groupId: Int
    urlAvatar: String
  }

  input UpdateMemberInput {
    name: String
    birthDate: DateTime
    phoneNumber: String
    email: String
    address: String
    groupId: Int
    urlAvatar: String
  }
  type Members {
    members: [Member]
  }
  type Mutation {
    createManyMembers(input: [CreateMemberInput!]!): Members @requireAuth
    createMember(input: CreateMemberInput!): Member! @requireAuth
    updateMember(id: Int!, input: UpdateMemberInput!): Member! @requireAuth
    deleteMember(id: Int!): Member! @requireAuth(roles: ["admin", "manager"])
  }
`
