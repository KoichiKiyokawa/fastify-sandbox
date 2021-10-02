import { User } from "../repositories/auth.repository"

declare module "fastify" {
  interface Session {
    user?: User
  }
}
