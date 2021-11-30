import { User } from "@prisma/client"

export class UserEntity {
  constructor(private readonly data: User) {}

  toJSON(): Partial<User> {
    return {
      ...this.data,
      password: undefined,
    }
  }
}
