import clsx from "clsx"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function ButtonSimple({
  type = "button",
  children,
  className,
  ...rest
}: ButtonProps) {
  return (
    <button {...rest} type={type} className={clsx("btn-primary", className)}>
      {children}
    </button>
  )
}
