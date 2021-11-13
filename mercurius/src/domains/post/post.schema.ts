import { gql } from "../../utils/gql"

export const PostSchema = gql`
  type Post {
    id: String!
    user: User!
    userId: String!
    title: String!
    body: String!
  }
`
