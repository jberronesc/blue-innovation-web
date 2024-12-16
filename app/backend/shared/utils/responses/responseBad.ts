import { NextResponse } from "next/server"

const responseBad = ({
  data = {},
  message = "A ocurrido un error!.",
  code = "UNKNOWN",
  errors = [],
  status = 400,
}: {
  data?: { [x: string]: any }
  message?: string
  code?: string
  errors?: any
  status?: number
}) => {
  if (!data.hasOwnProperty("message")) data.message = message

  if (!data.hasOwnProperty("code")) data.code = code

  if (!data.hasOwnProperty("errors")) data.errors = errors

  return NextResponse.json(data, {
    status,
  })
}

export default responseBad
