import { FastifyRequest } from "fastify"
import { Hook } from "fastify-decorators"
import createHttpError from "http-errors"

export class AuthorizedController {
  @Hook("onRequest")
  async onRequest(req: FastifyRequest) {
    console.log("onRequest")
    if (req.session.user == null) throw new createHttpError.Unauthorized()
  }
}
