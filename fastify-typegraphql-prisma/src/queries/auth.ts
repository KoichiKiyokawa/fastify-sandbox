import { Arg, Query, Resolver } from "type-graphql"
import { User } from "@generated/type-graphql"
import { db } from "../utilts/db"
import bcrypt from "bcryptjs"
import { UserEntity } from "../domains/user"

@Resolver()
export class AuthResolver {
  @Query(() => User)
  async login(@Arg("email") email: string, @Arg("passowrd") password: string) {
    const targetUser = await db.user.findFirst({ where: { email } })
    if (targetUser === null) throw new Error("User not found")
    const ok = await bcrypt.compare(password, targetUser.password)
    if (!ok) throw new Error("Password is incorrect")
    console.log({ targetUser })
    return new UserEntity(targetUser).toJSON()
  }
}
