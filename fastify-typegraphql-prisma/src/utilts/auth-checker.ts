import { AuthChecker } from "type-graphql"
import { Context } from "../types/context"

export const ROLES = {
  ADMIN: "ADMIN",
  LINE_USER: "LINE_USER",
} as const

export type RoleTypes = keyof typeof ROLES

export const authChecker: AuthChecker<Context, RoleTypes> = async (
  { context },
  roles
) => {
  if (roles.length === 0) {
    throw Error("No roles provided to @Authorized")
  }

  if (roles.includes(ROLES.ADMIN) && !context.reply.request.session.userId) {
    throw Error("You are not logged in")
  }

  if (roles.includes(ROLES.LINE_USER) && !(await validateLineLogin(context))) {
    throw Error("The line user is not logged in")
  }

  return true
}

/**
 * @private
 */
async function validateLineLogin(context: Context) {
  // TODO: implement
  return true
}
