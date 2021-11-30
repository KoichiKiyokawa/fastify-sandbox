import "reflect-metadata"
import { resolvers } from "@generated/type-graphql"
import Fastify from "fastify"
import mercurius from "mercurius"
import { buildSchema } from "type-graphql"
import { db } from "./utilts/db"
import { AuthResolver } from "./queries/auth"

async function bootstrap() {
  const app = Fastify({ logger: true })
  const schema = await buildSchema({ resolvers: [...resolvers, AuthResolver] })
  app.register(mercurius, {
    schema,
    graphiql: process.env.NODE_ENV !== "production",
    context: () => ({ prisma: db }),
  })
  app.listen(3000, "0.0.0.0")
}

bootstrap().catch(console.error)
