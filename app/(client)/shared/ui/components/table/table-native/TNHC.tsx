import React, { ReactNode } from "react"

export const TNHC = ({ children }: { children?: ReactNode }) => {
  return <th className="py-3 px-4">{children}</th>
}
