import { bootstrap } from "fastify-decorators"
import { resolve } from "path"
import fastify from "fastify"
import fastifySession from "@fastify/session"
import fastifyCookie from "fastify-cookie"

// Require the framework and instantiate it
const instance = fastify()

// Register handlers auto-bootstrap
instance.register(bootstrap, {
  // Specify directory with our controllers
  directory: resolve(__dirname, `controllers`),

  // Specify mask to match only our controllers
  mask: /\.controller\./,
})

instance.register(fastifyCookie)
instance.register(fastifySession, {
  secret: "secretjeoaiwngnakljnihactuchoiahcnignoahgo",
})

// Run the server!
instance.listen(3000)
