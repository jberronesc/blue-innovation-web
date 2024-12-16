import { clsx } from "clsx"
import Link from "next/link"

interface Breadcrumb {
  label: string
  href: string
  active?: boolean
}

export function Breadcrumbs({
  breadcrumbs = [],
  right,
}: {
  breadcrumbs?: Breadcrumb[]
  right?: JSX.Element
}) {
  return (
    <div className="flex justify-between w-full">
      <nav aria-label="Breadcrumb" className="mb-6 block">
        <ol className={clsx("flex text-1xl")}>
          {breadcrumbs.map((breadcrumb, index) => (
            <li
              key={breadcrumb.href}
              aria-current={breadcrumb.active}
              className={clsx(
                breadcrumb.active ? "text-gray-900" : "text-gray-500"
              )}
            >
              <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
              {index < breadcrumbs.length - 1 ? (
                <span className="mx-3 inline-block">/</span>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
      <div className="block">{right}</div>
    </div>
  )
}
