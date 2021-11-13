import Fastify from "fastify"
import mercurius from "mercurius"
import { CoreSchema } from "./domains/core/core.schema"
import { PostLoader, PostQuery } from "./domains/post/post.resolver"
import { PostSchema } from "./domains/post/post.schema"
import { UserQuery, UserLoader } from "./domains/user/user.resolver"
import { UserSchema } from "./domains/user/user.schema"

const app = Fastify()

app.register(mercurius, {
  schema: [CoreSchema, UserSchema, PostSchema],
  resolvers: {
    Query: {
      ...UserQuery,
      ...PostQuery,
    },
  },
  loaders: {
    ...UserLoader,
    ...PostLoader,
  },
  graphiql: true,
})

// app.get("/", async function (req, reply) {
//   const query = "{ add(x: 2, y: 2) }"
//   return reply.graphql(query)
// })

app.listen(3000)
