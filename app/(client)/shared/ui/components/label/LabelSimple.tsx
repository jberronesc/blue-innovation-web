import React from "react"

export const LabelSimple = ({
  name,
  label,
}: {
  name: string
  label: string
}) => {
  return (
    <label
      htmlFor={name}
      className="mb-2 block text-sm font-medium text-blueGray-950"
    >
      {label}
    </label>
  )
}
