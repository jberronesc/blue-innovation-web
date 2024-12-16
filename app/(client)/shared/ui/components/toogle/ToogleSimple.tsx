import clsx from "clsx"
import React from "react"

interface PropsParams {
  checked: boolean
  label?: string
  size?: "small" | "default" | "large"
  disabled?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ToogleSimple = ({
  size = "small",
  disabled = false,
  ...props
}: PropsParams) => {
  const getFielsNames = () => {
    const result: { [x: string]: any } = {}

    if (disabled) result["disabled"] = true

    return result
  }

  return (
    <>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={props.checked}
          onChange={props.onChange}
          {...getFielsNames()}
        />
        {(size == "small" && (
          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        )) ||
          (size == "default" && (
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          )) || (
            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          )}
        <span
          className={clsx("ms-3 text-sm font-medium", {
            "text-gray-900": props.checked,
            "text-gray-400": !props.checked,
          })}
        >
          {props.label}
        </span>
      </label>
    </>
  )
}
