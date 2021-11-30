import "reflect-metadata"
import { resolvers } from "@generated/type-graphql"
import Fastify from "fastify"
import mercurius from "mercurius"
import { buildSchema } from "type-graphql"
import { db } from "./utilts/db"
import { AuthResolver } from "./queries/auth"
import fastifyCookie from "fastify-cookie"
import fastifySession from "@fastify/session"

async function bootstrap() {
  const app = Fastify({ logger: true })
  app.register(fastifyCookie)
  app.register(fastifySession, {
    secret: "a secret with minimum length of 32 characters",
  })
  const schema = await buildSchema({ resolvers: [...resolvers, AuthResolver] })
  app.register(mercurius, {
    schema,
    graphiql: process.env.NODE_ENV !== "production",
    context: () => ({ prisma: db }),
  })
  app.listen(3000, "0.0.0.0")
}

bootstrap().catch(console.error)
