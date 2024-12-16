import React from "react"
import { IconTextRecognition } from "@tabler/icons-react"
import { AlertSimple } from "./AlertSimple"

export const AlertErrors = ({
  message,
  errors,
}: {
  message: string
  errors: any[]
}) => {
  const getErrors = (errors: any[]): JSX.Element => {
    console.log(errors)

    const getError = (errorObject: any): JSX.Element => {
      if (typeof errorObject === "string") {
        console.log("11111111111111111")
        console.log(errorObject)

        return (
          <>
            <li>{errorObject}</li>
          </>
        )
      }

      const errorsHtml = Object.keys(errorObject).map((key) => {
        const value = errorObject[key]

        if (typeof value === "string") {
          console.log("11111111111111111")
          console.log(value)

          return (
            <>
              <li>{value}</li>
            </>
          )
        }

        if (Array.isArray(value)) {
          console.log("0000000000000000")
          console.log(value)

          return (
            <>
              <li>
                {key}
                {value.map((elem) => elem.toString()).join("----")}
                <ul className="space-y-4 list-disc list-inside dark:text-gray-400">
                  {value.map((elem) => getError(elem))}
                </ul>
              </li>
            </>
          )
        }

        if (typeof value === "object") {
          console.log("22222222222222")
          console.log(value)
          console.log(getError(value))
          return (
            <>
              <li>
                {key}
                <ul className="space-y-4 list-disc list-inside dark:text-gray-400">
                  {getError(value)}
                </ul>
              </li>
            </>
          )
        }

        console.log("no llegues")
        return <></>
      })

      return (
        <ul className="space-y-4 list-disc list-inside dark:text-gray-400">
          {errorsHtml}
        </ul>
      )
    }

    return (
      <>
        {errors.map((elem) => {
          if (typeof elem === "string")
            return (
              <>
                <li key={elem}>{elem}</li>
              </>
            )

          if (typeof elem === "object") {
            return (
              <>
                <li>{getError(elem)}</li>
              </>
            )
          }

          return <></>
        })}
      </>
    )
  }

  return (
    <AlertSimple
      label={message || "Error!"}
      additionalContent={
        <div className="mx-9">
          <ul className="space-y-4 list-disc list-inside dark:text-gray-400">
            {getErrors(errors)}
          </ul>
        </div>
      }
      color="red"
      icon={<IconTextRecognition className="mr-2" />}
      rounded
    />
  )
}
