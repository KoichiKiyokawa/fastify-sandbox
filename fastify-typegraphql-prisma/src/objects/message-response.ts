import { Field, ObjectType } from "type-graphql"

@ObjectType()
export class MessageResponse {
  @Field()
  message!: string
}
