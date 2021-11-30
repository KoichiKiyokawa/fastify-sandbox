import { Arg, Ctx, Query, Resolver } from "type-graphql"
import { User } from "@generated/type-graphql"
import { db } from "../utilts/db"
import bcrypt from "bcryptjs"
import { UserEntity } from "../domains/user"
import { Context } from "../types/context"
import { MessageResponse } from "../objects/message-response"

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

  @Query(() => MessageResponse)
  async logout(@Ctx() ctx: Context): Promise<MessageResponse> {
    const { request } = ctx.reply
    if (request.session.userId == null) return { message: "already logged out" }
    request.session.userId = null
    await new Promise((resolve, reject) => {
      request.sessionStore.destroy(request.session.sessionId, (err) => {
        if (err) reject(err)
        else resolve(null)
      })
    })

    return { message: "ok" }
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
