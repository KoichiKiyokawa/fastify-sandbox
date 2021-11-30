import { Arg, Ctx, Query, Resolver } from "type-graphql"
import { User } from "@generated/type-graphql"
import { db } from "../utilts/db"
import bcrypt from "bcryptjs"
import { UserEntity } from "../domains/user"
import { Context } from "../types/context"

@Resolver()
export class AuthResolver {
  @Query(() => User)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() ctx: Context
  ) {
    const targetUser = await db.user.findFirst({ where: { email } })
    if (targetUser === null) throw new Error("User not found")
    const ok = await bcrypt.compare(password, targetUser.password)
    if (!ok) throw new Error("Password is incorrect")
    ctx.reply.request.session.userId = targetUser.id
    return new UserEntity(targetUser).toJSON()
  }

  @Query(() => User)
  async me(@Ctx() ctx: Context) {
    const { userId } = ctx.reply.request.session
    if (userId == null) throw new Error("Not logged in")

    return db.user.findUnique({
      where: { id: userId },
    })
  }
}
