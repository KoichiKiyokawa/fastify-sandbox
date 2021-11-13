import { gql } from "../../utils/gql"

export const CoreSchema = gql`
  type Query {
    """
    ユーザ単体
    """
    user(id: String): User
    users(limit: Int): [User]
    posts(limit: Int): [Post]
  }
`
