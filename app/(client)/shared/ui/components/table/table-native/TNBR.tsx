import React, { ReactNode } from "react"

export const TNBR = ({ children }: { children?: ReactNode }) => {
  return (
    <tr className="border-b border-blue-gray-200 text-black">{children}</tr>
  )
}
