import fastifySession from "@fastify/session"
import fastify from "fastify"
import fastifyCookie from "fastify-cookie"
import { bootstrap } from "fastify-decorators"
import { resolve } from "path"
import "reflect-metadata"
import AuthController from "./controllers/auth.controller"
import UserController from "./controllers/user.controller"

// Require the framework and instantiate it
const instance = fastify()

// Register handlers auto-bootstrap
instance.register(bootstrap, {
  controllers: [AuthController, UserController],
})

instance.register(fastifyCookie)
instance.register(fastifySession, {
  secret: "secretjeoaiwngnakljnihactuchoiahcnignoahgo",
  cookie: {
    httpOnly: true,
    secure: false,
  },
})

// Run the server!
instance.listen({ port: Number(process.env.PORT ?? 3000), host: "0.0.0.0" })
