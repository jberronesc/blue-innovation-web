import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import { z } from "zod"
import { FetchBackPOSTWithoutTokenBlueI } from "./app/backend/shared/utils/fetch/fetchBackBlueInnovation"
import { SuccessResult } from "./app/backend/shared/utils/either/errorCustomEither"

async function getUser({
  username,
  password,
  exercise,
}: {
  username: string
  password: string
  exercise: string
}): Promise<{
  id: string
  token: string
} | null> {
  try {
    console.log({
      msg: "AUTH- PETICION A BACKEND",
    })

    const responseEither = await new FetchBackPOSTWithoutTokenBlueI({
      url: "/security/v1/auth",
      body: {
        username,
        password,
        exercise,
      },
    }).exec()

    if (responseEither.isLeft()) return null

    const value: SuccessResult = responseEither.getRight()

    return { ...value.data.user, token: value.data.accessToken }
  } catch (error) {
    throw new Error("Failed to get user.")
  }
}

export const { auth, signIn, signOut, unstable_update } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) /* : Promise<User | null> */ {
        const parsedCredentials = z
          .object({
            username: z.string(),
            password: z.string().min(3),
            exercise: z.string(),
          })
          .safeParse(credentials)

        console.log({
          msg: "AUTH - AUTENTICANDO",
          credentials,
          parsedCredentials,
        })

        if (!parsedCredentials.success) return null

        const user = await getUser(parsedCredentials.data)

        if (!user) return null

        console.log({
          msg: "AUTH - AUTENTICANDO - RESOLVER",
        })

        return {
          id: user.id.toString(),
          token: user.token,
        }
      },
    }),
  ],
})
