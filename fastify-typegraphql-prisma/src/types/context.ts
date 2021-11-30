import { FastifyRequest } from "fastify"

export interface Context {
  reply: {
    request: FastifyRequest
  }
}
