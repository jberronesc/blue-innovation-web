import React, { ReactNode } from "react"

export const TNBC = ({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) => {
  return <td className={`text-xs py-3 px-4 ${className}`}>{children}</td>
}
