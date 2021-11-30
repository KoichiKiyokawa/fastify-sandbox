declare module "fastify" {
  interface Session {
    userId: string
  }
}

// これをつけないと，index.tsでエラーになるが，つけると，auth.tsでuserIdがanyになってしまう
export {}
