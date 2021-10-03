import { Controller } from "fastify-decorators"

@Controller()
export default class AppController {
  index() {
    return "Hello, World!"
  }
}
