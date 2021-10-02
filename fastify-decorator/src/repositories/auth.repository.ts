import { Service } from "fastify-decorators"

export type User = {
  name: string
  email: string
  password: string
}

const users: User[] = [
  { name: "user1", email: "hoge@example.com", password: "hogehoge" },
  { name: "user2", email: "hoge2@example.com", password: "hogehoge" },
  { name: "user3", email: "hoge3@example.com", password: "hogehoge" },
]

@Service()
export class AuthRepository {
  async findByEmail(email: string): Promise<User | undefined> {
    return users.find((user) => user.email === email)
  }
}
