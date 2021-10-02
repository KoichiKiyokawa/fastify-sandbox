import { FastifyRequest } from "fastify"
import { Hook } from "fastify-decorators"
import createHttpError from "http-errors"

export class AuthorizedController {
  @Hook("preValidation")
  async preValidation(req: FastifyRequest) {
    console.log("preValidation")
    if (req.session.user == null) throw new createHttpError.Unauthorized()
  }
}
