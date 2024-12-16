import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      /*
      console.log({
        msg: "AUTH CONFIG - Obteniendo autorizacion",
        pathname: nextUrl.pathname,
        isLoggedIn: !!auth?.user,
        auth,
      })
      */

      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")
      const isIndex = nextUrl.pathname == "/"
      // console.log(nextUrl.pathname)
      if (isIndex) return true

      if (isOnDashboard) {
        // console.log({ isOnDashboard, isLoggedIn })
        return isLoggedIn
      }

      const isOnBackend = nextUrl.pathname.startsWith("/backend/api")

      if (isOnBackend) {
        // console.log({ isOnBackend, isLoggedIn })
        console.log("en backend")
        if (nextUrl.pathname.startsWith("/backend/api/security/auth/v1/login"))
          return true

        return isLoggedIn
      }

      if (isLoggedIn) {
        // console.log({ isLoggedIn })
        return Response.redirect(new URL("/dashboard", nextUrl))
      }

      return false
    },

    async session({ session, token, trigger }) {
      // console.log({ msg: "AUTH CONFIG - CALLBACK SESSION", session, token })

      session = {
        ...session,
        user: session.user,
      }

      if (session?.user) {
        session.user.id = token.sub || ""
        session.token = token.token || ""
      }
      // if (session?.user) session.user.groupId = token?.groupId as string

      return session
    },

    async jwt(props) {
      const { user, token, trigger, session, ...propsExtras } = props
      /*
      console.log({
        msg: "AUTH CONFIG - JWT",
        trigger,
        user,
        session,
        token,
        propsExtras,
      })
      */

      if (trigger == "signIn") {
        const result = {
          ...token,
          token: user.token,
        }

        //console.log({msg: "AUTH CONFIG - JWT - signIn",result,})

        return result
      }

      if (trigger == "update") {
        return {
          ...token,
          ...user,
          token: session.user.token,
          uid: session.user.id,
        }
      }

      if (user) {
        token.uid = user.id
      }

      return token
    },
  },
  providers: [],
} satisfies NextAuthConfig

// https://stackoverflow.com/questions/64763911/role-based-routes-in-next-js-in-react
