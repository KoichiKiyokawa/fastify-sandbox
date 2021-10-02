import { FastifyRequest } from "fastify"
import { Controller, GET, POST } from "fastify-decorators"
import createHttpError from "http-errors"
import { AuthRepository } from "../repositories/auth.repository"
import { AuthorizedController } from "./core"

@Controller()
export default class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  @POST("/login")
  async login(
    req: FastifyRequest<{ Body: { email: string; password: string } }>
  ) {
    const { email, password } = req.body
    const targetUser = await this.authRepository.findByEmail(email)
    if (targetUser?.password === password) {
      req.session.user = targetUser
      return "ok"
    } else {
      throw new createHttpError.Unauthorized()
    }
  }

  @GET("/me", { preValidation: new AuthorizedController().preValidation })
  async me(req: FastifyRequest) {
    return req.session.user
  }
}
