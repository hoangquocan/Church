export const schema = gql`
  type Member {
    id: Int!
    name: String!
    birthDate: DateTime!
    phoneNumber: String!
    email: String!
    address: String!
    group: Group
    groupId: Int
    attendance: [Attendance]!
    createdAt: DateTime!
  }
  type GroupMember {
    group: [Group!]
  }
  type MemberPage {
    members: [Member!]!
    count: Int!
  }
  type Query {
    memberPage(page: Int): MemberPage @requireAuth
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
  }

  input UpdateMemberInput {
    name: String
    birthDate: DateTime
    phoneNumber: String
    email: String
    address: String
    groupId: Int
  }

  type Mutation {
    createMember(input: CreateMemberInput!): Member! @requireAuth
    updateMember(id: Int!, input: UpdateMemberInput!): Member! @requireAuth
    deleteMember(id: Int!): Member! @requireAuth
  }
`
