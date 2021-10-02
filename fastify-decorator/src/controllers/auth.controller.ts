import { FastifyRequest } from "fastify"
import { Controller, Inject, POST } from "fastify-decorators"
import createHttpError from "http-errors"
import { AuthRepository } from "../repositories/auth.repository"

@Controller()
export default class AuthController {
  @Inject(AuthRepository)
  private readonly authRepository!: AuthRepository

  @POST({ url: "/login" })
  async login(
    req: FastifyRequest<{ Body: { email: string; password: string } }>
  ) {
    const { email, password } = req.body
    const targetUser = await this.authRepository.findByEmail(email)
    if (targetUser?.password === password) {
      req.session.user = targetUser
    } else {
      throw new createHttpError.Unauthorized()
    }
  }
}
