import { User } from ".prisma/client"
import { IFieldResolver, Loader } from "mercurius"
import { prisma } from "../../utils/prisma"

const user: IFieldResolver<{}, {}, { id: string }> = (_, { id }) => {
  return prisma.user.findUnique({ where: { id } })
}

const users: IFieldResolver<{}, {}, { limit?: number }> = (_, { limit }) => {
  return prisma.user.findMany({ take: limit })
}

export const UserQuery = { user, users }

const posts: Loader<User, { limit?: number }> = async (users) => {
  return prisma.$transaction(
    users.map((u) =>
      prisma.post.findMany({
        where: { userId: u.obj.id },
        take: u.params.limit,
      })
    )
  )
}

export const UserLoader = { User: { posts } }
