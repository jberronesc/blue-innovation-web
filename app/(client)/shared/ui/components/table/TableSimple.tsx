import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table"

interface PropsParams {
  children?: JSX.Element[]

  theadTrs?: JSX.Element[]

  tfootTrs?: JSX.Element[]

  hideHeader?: boolean
}

export const TableSimple = ({ hideHeader = false, ...props }: PropsParams) => {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="bg-gray-50">
          {props.theadTrs && props.children && (
            /* removeWrapper */
            <Table
              aria-label="Example static collection table"
              hideHeader={hideHeader}
              isCompact={true}
              radius="none"
              shadow="none"
              isStriped={false}
              // isHeaderSticky
              fullWidth
              removeWrapper
              // topContent
            >
              <TableHeader>{...props.theadTrs}</TableHeader>
              <TableBody
                className="bg-black"
                emptyContent={"No hay registros."}
              >
                {...props.children}
              </TableBody>
              {/*
              <TableBody className="bg-black">{props.children}</TableBody>
            <tfoot className="bg-black">{props.tfootTrs}</tfoot>
              */}
            </Table>
          )}
        </div>
      </div>
    </div>
  )
}

export default TableSimple
