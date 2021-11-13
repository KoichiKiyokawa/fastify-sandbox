import { Post, User } from "@prisma/client"
import { IFieldResolver, Loader } from "mercurius"
import { prisma } from "../../utils/prisma"

const posts: IFieldResolver<User, {}, { limit: number }> = (_, { limit }) => {
  return prisma.post.findMany({ take: limit })
}

export const PostQuery = { posts }

const user: Loader<Post> = async (queries) => {
  const users = await prisma.user.findMany({
    where: { id: { in: queries.map((q) => q.obj.userId) } },
  })

  return queries.map((q) => users.find((u) => u.id === q.obj.userId))
}

export const PostLoader = {
  Post: { user },
}
