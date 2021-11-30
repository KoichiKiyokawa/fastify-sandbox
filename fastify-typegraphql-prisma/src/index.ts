import "reflect-metadata"
import {
  resolvers,
  ResolversEnhanceMap,
  applyResolversEnhanceMap,
} from "@generated/type-graphql"
import Fastify from "fastify"
import mercurius from "mercurius"
import { Authorized, buildSchema } from "type-graphql"
import { db } from "./utilts/db"
import { AuthResolver } from "./queries/auth"
import fastifyCookie from "fastify-cookie"
import fastifySession from "@fastify/session"
import { authChecker } from "./utilts/auth-checker"

const resolversEnhanceMap: ResolversEnhanceMap = {
  User: { _all: [Authorized()] },
  Post: { _all: [Authorized()] },
  Comment: { _all: [Authorized()] },
}
applyResolversEnhanceMap(resolversEnhanceMap)

async function bootstrap() {
  const app = Fastify({ logger: true })
  app.register(fastifyCookie)
  app.register(fastifySession, {
    secret: "a secret with minimum length of 32 characters",
  })
  const schema = await buildSchema({
    resolvers: [...resolvers, AuthResolver],
    authChecker,
  })
  app.register(mercurius, {
    schema,
    graphiql: process.env.NODE_ENV !== "production",
    context: () => ({ prisma: db }),
  })
  app.listen(3000, "0.0.0.0")
}

bootstrap().catch(console.error)
