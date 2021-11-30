import { PrismaClient } from "@prisma/client"
import { range } from "rhodash"
import bcrypt from "bcryptjs"

const db = new PrismaClient()

async function seed() {
  await Promise.all(
    range(10).map((i) =>
      db.user.create({
        data: {
          name: `user${i}`,
          email: `user${i}@example.com`,
          password: bcrypt.hashSync("password", 10),
          posts: {
            create: range(10).map((j) => ({
              title: `user${i}_post${j}_title`,
              body: `user${i}_post${j}_body`,
            })),
          },
        },
      })
    )
  )
}

seed()
