import { responseBad, responseOk } from "@/app/backend/shared/utils/responses"
import { signIn } from "@/auth"

export async function POST(request: Request) {
  const data = await request.json()

  console.log({
    msg: "ROUTE ENDPOINT LOGIN.",
    data,
  })

  try {
    await signIn("credentials", data)
  } catch (error) {
    if ((error as Error).message.includes("NEXT_REDIRECT")) {
      console.log({
        msg: "ROUTE RESULTADO DEL LOGIN.",
        error: error as Error,
      })

      return responseOk({})
    }
  }

  return responseBad({})
}
