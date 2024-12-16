import React from "react"
import clsx from "clsx"
import { IconTextRecognition } from "@tabler/icons-react"
import { Input } from "@nextui-org/react"

interface PropsParams {
  children?: JSX.Element
  label: string
  input?: JSX.Element
  icon?: JSX.Element
  errors?: JSX.Element
  helpText?: string
  isClearable?: boolean

  register: {
    [x: string]: any
  }
}

export const InputSearchSimple = ({
  label,
  input,
  icon,
  errors,
  register,
  helpText,
  isClearable = false,
}: PropsParams) => {
  return (
    <div className="">
      <div className="relative rounded-md">
        <div className="relative">
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              {label}
            </label>
            <div className="mt-2">
              <input
                type="text"
                placeholder={label}
                autoComplete="off"
                {...register}
                className={clsx(
                  "block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
                  { "bg-gray-100": register?.readOnly }
                )}
              />
            </div>
          </div>
        </div>
        {helpText && (
          <p
            id="helper-text-explanation"
            className="mt-2 text-sm text-gray-500 dark:text-gray-400"
          >
            {helpText}
          </p>
        )}
      </div>
      {errors}
    </div>
  )
}
