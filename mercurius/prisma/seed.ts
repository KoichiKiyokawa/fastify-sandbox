import { prisma } from "../src/utils/prisma"
;(async () => {
  for (let u = 0; u < 100; u++) {
    await prisma.user.create({
      data: {
        name: `user${u}`,
        birthday: new Date(2000, u % 12, (u % 27) + 1),
        posts: {
          create: Array.from(Array(1000).keys()).map((i) => ({
            title: `user${u}-title${i}`,
            body: `user${u}-body${i}`,
          })),
        },
      },
    })
  }
})()
