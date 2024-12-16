import { responseBad, responseOk } from "@/app/backend/shared/utils/responses"
import { auth } from "@/auth"
import { FetchBackGETTokenBlueI } from "@bckutils/fetch/fetchBackBlueInnovation"

export async function POST(request: Request) {
  try {
    const session = await auth()

    console.log({ msg: "ROUTE SESSION EN PROFILE", session })

    const response = await new FetchBackGETTokenBlueI({
      url: `/security/v1/auth/profile`,
    }).exec()

    console.log({ msg: "ROUTE PROFILE RESPONSE", response })

    if (response.isLeft()) return responseBad({})

    console.log({
      msg: "ROUTE PROFILE RESPONSE JSON",
      data: response.getRight().data,
    })

    return responseOk({
      data: response.getRight().data,
    })
  } catch (error) {
    return responseBad({})
  }
}
