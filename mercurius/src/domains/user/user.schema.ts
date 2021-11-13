import { gql } from "../../utils/gql"

export const UserSchema = gql`
  type User {
    id: String!
    name: String!
    birthday: String!
    posts(limit: Int): [Post]
  }
`
