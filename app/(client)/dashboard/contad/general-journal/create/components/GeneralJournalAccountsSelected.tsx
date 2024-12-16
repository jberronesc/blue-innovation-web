"use client"

import { v4 } from "uuid"
import { Button } from "@nextui-org/react"
import SelectReact from "react-select"
import { IconTrashXFilled } from "@tabler/icons-react"
import { Dispatch, SetStateAction, memo } from "react"
import {
  AccountAccountantSelectedType,
  AccountAccountantSpecificType,
} from "@contad/general-journal/domain/interfaces/AccountAccountantSelectedType"
import ToastifyUtil from "@utils/toastify/toastify"

const InputAmountComponent = ({
  rows,
  setRow,
  amount,
  idV4,
}: {
  amount: number
  idV4: string
  rows: AccountAccountantSelectedType[]
  setRow: Dispatch<SetStateAction<AccountAccountantSelectedType[]>>
}) => {
  return (
    <input
      type="text"
      className="w-20 text-right"
      defaultValue={amount}
      autoComplete="off"
      autoFocus={false}
      onBlur={(e) => {
        setRow(
          rows.map((row) => {
            if (row.idV4 != idV4) return row

            return { ...row, amount: Number(e.target.value) }
          })
        )
      }}
    />
  )
}

const InputAmount = memo(InputAmountComponent)

const GeneralJournalAccountsSelected = ({
  rows,
  accountAccountantsOptions,
  isDebit,
  sumRow,
  setRow,
}: {
  rows: AccountAccountantSelectedType[]
  accountAccountantsOptions: AccountAccountantSpecificType[]
  isDebit: boolean
  sumRow: number
  setRow: Dispatch<SetStateAction<AccountAccountantSelectedType[]>>
}) => {
  const optionEmpty = {
    value: 0,
    label: "--------",
    account: "",
    description: "",
    subgroup: "",
  }

  return (
    <table className="min-w-full bg-white shadow-md rounded-xl">
      <thead>
        <tr className="bg-blue-gray-100 text-gray-700">
          <th key={v4()} className="py-3 px-4">
            Nº
          </th>
          <th key={v4()} className="py-3 px-4">
            Escojer
          </th>
          <th key={v4()} className="py-3 px-4">
            Cuenta seleccionada
          </th>
          <th key={v4()} className="py-3 px-4">
            Centro costos
          </th>
          <th key={v4()} className="py-3 px-4">
            Debe
          </th>
          <th key={v4()} className="py-3 px-4">
            Haber{" "}
          </th>
          <th key={v4()} className="py-3 px-4">
            Concepto{" "}
          </th>
          <th key={v4()} className="py-3 px-4">
            <span className="sr-only">Opciones</span>
          </th>
        </tr>
      </thead>

      <tbody className="text-blue-gray-900">
        {[
          ...rows?.map(
            (
              { accountAccountant, amount, centerCosts, concept, idV4 },
              index
            ) => (
              <tr
                key={v4()}
                className="border-b border-blue-gray-200 text-black"
              >
                <td className="text-xs py-3 px-4">{index + 1}</td>
                <td className="text-xs py-3 px-4">
                  <SelectReact
                    autoFocus={false}
                    options={accountAccountantsOptions}
                    className="text-black basic-single w-72"
                    menuPortalTarget={document.body}
                    styles={{
                      menuPortal: (base) => ({
                        ...base,
                        zIndex: 1000,
                        color: "black",
                      }),
                    }}
                    defaultValue={optionEmpty}
                    onChange={(e) => {
                      if (
                        rows.some(
                          (row) => row.accountAccountant.value == e?.value
                        )
                      )
                        return ToastifyUtil.error(
                          "Ya existe cuenta registrada."
                        )

                      setRow(
                        rows.map((row) => {
                          if (row.idV4 != idV4) return row

                          return {
                            ...row,
                            accountAccountant: e ? e : optionEmpty,
                          }
                        })
                      )
                    }}
                  />
                </td>
                <td className="py-3 px-4 ">
                  <span className="font-bold underline decoration-red-500 text-sm">
                    {accountAccountant.account}
                  </span>
                  <br />
                  <span className="text-xs">
                    {accountAccountant.description}
                  </span>
                </td>
                <td className="text-xs py-3 px-4">
                  {centerCosts.map((centerCost) => (
                    <>{centerCost.name}</>
                  ))}
                </td>
                <td className="text-xs py-3 px-4">
                  {isDebit ? (
                    <InputAmount
                      amount={amount}
                      idV4={idV4}
                      rows={rows}
                      setRow={setRow}
                    />
                  ) : (
                    <div className="w-20 text-right">0.00</div>
                  )}
                </td>
                <td className="text-xs py-3 px-4">
                  {isDebit ? (
                    <div className="w-20 text-right">0.00</div>
                  ) : (
                    <InputAmount
                      amount={amount}
                      idV4={idV4}
                      rows={rows}
                      setRow={setRow}
                    />
                  )}
                </td>
                <td className="text-xs py-3 px-4">
                  <textarea
                    className="w-32 h-full peer resize-y rounded-[7px] border border-blue-gray-200 bg-transparent px-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                    defaultValue={concept}
                    onBlur={(e) => {
                      setRow(
                        rows.map((row) => {
                          if (row.idV4 != idV4) return row

                          return { ...row, concept: e.target.value }
                        })
                      )
                    }}
                  />
                </td>
                <td className="text-xs py-3 px-4 text-center">
                  <Button
                    isIconOnly
                    color="danger"
                    size="sm"
                    onClick={() =>
                      setRow(rows.filter((row) => row.idV4 != idV4))
                    }
                  >
                    <IconTrashXFilled />
                  </Button>
                </td>
              </tr>
            )
          ),
          <tr key={v4()} className="text-black">
            <td className="text-xs py-3 px-4">-</td>
            <td className="text-xs py-3 px-4">-</td>
            <td className="text-xs py-3 px-4">-</td>
            <td className="text-xs py-3 px-4">
              <b>TOTAL</b>
            </td>
            <td className="text-xs py-3 px-4 text-right">
              <b>{isDebit ? sumRow : "0.0"}</b>
            </td>
            <td className="text-xs py-3 px-4 text-right">
              <b>{isDebit ? "0.0" : sumRow}</b>
            </td>
            <td className="text-xs py-3 px-4">-</td>
            <td className="text-xs py-3 px-4">-</td>
          </tr>,
        ]}
      </tbody>
    </table>
  )
}

export default memo(GeneralJournalAccountsSelected)
