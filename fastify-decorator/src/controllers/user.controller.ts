import { FastifyRequest } from "fastify"
import { Controller, GET, POST } from "fastify-decorators"
import { AuthorizedController } from "./core"

@Controller({ route: "/users" })
export default class UserController extends AuthorizedController {
  @GET()
  async getUser(req: FastifyRequest) {
    return "ok"
  }

  @POST()
  async createUser(req: FastifyRequest) {
    return "createUser"
  }
}
