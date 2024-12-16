interface PropsParams {
  children?: JSX.Element[]

  theadTrs?: JSX.Element[]

  tfootTrs?: JSX.Element[]

  hideHeader?: boolean
}

export const TableNative = ({ hideHeader = false, ...props }: PropsParams) => {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full">
        <div className="bg-gray-50">
          {props.theadTrs && props.children && (
            /* removeWrapper */
            <table className="min-w-full bg-white shadow-md rounded-xl">
              <thead>
                <tr className="bg-blue-gray-100 text-gray-700">
                  {...props.theadTrs}
                </tr>
              </thead>
              <tbody className="text-blue-gray-900">{...props.children}</tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
