"use client"

import { v4 } from "uuid"
import clsx from "clsx"
import { memo } from "react"
import { ModalSimple } from "@component/modal"
import { ToogleSimple } from "@component/toogle"
import { GeneralJournalBudgetPartida } from "@contad/general-journal/domain/interfaces/GeneralJournalInfoEntity"

const GeneralBudgetPartidasSelected = ({
  budgetPartidasSelected,
  sumAmountDisponibilidades,
  modalDisponibilidad,
  onSuccess,
  onCancel,
  setBudgetPartidasSelected,
}: {
  budgetPartidasSelected: {
    idV4: string
    amount: number
    isSelected: boolean
    budgetPartida: GeneralJournalBudgetPartida
  }[]
  sumAmountDisponibilidades: {
    accountAccounantDisponibilidades: number
    budgetPartidaDisponibilidades: number
  }
  modalDisponibilidad: boolean
  onSuccess: () => any
  onCancel: () => any

  setBudgetPartidasSelected: React.Dispatch<
    React.SetStateAction<
      {
        idV4: string
        amount: number
        isSelected: boolean
        budgetPartida: GeneralJournalBudgetPartida
      }[]
    >
  >
}) => {
  return (
    <ModalSimple
      title={"Existe cuenta disponibilidades detectada."}
      show={modalDisponibilidad}
      onSuccess={onSuccess}
      onCancel={onCancel}
    >
      <>
        <div className="text-black">
          <h1 className="font-bold text-large">
            Suma total de disponibilidades
            <br />
            Monto: {sumAmountDisponibilidades.accountAccounantDisponibilidades}
          </h1>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-xl">
          <thead>
            <tr className="bg-blue-gray-100 text-gray-700">
              <th key={v4()} className="py-3 px-4">
                Seleccionar
              </th>
              <th key={v4()} className="py-3 px-4">
                Partida Presupuestaria
              </th>
              <th key={v4()} className="py-3 px-4">
                Monto
              </th>
            </tr>
          </thead>

          <tbody className="text-blue-gray-900">
            {[
              ...budgetPartidasSelected?.map(
                ({ amount, budgetPartida, isSelected, idV4 }, index) => (
                  <tr
                    key={v4()}
                    className={clsx(
                      "border-b border-blue-gray-200 text-black",
                      {
                        "bg-blue-100": isSelected,
                      }
                    )}
                  >
                    <td className="text-xs py-3 px-4">
                      <ToogleSimple
                        checked={isSelected}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setBudgetPartidasSelected((state) =>
                            state.map((budgetPartidaSelected) => {
                              if (budgetPartidaSelected.idV4 != idV4)
                                return budgetPartidaSelected

                              return {
                                ...budgetPartidaSelected,
                                isSelected: e.target.checked,
                                amount: 0,
                              }
                            })
                          )
                        }}
                      />
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold underline decoration-red-500 text-sm">
                        {budgetPartida.partida}
                      </span>
                      <br />
                      <span className="text-xs">{budgetPartida.name}</span>
                    </td>
                    <td className="text-xs py-3 px-4 text-right">
                      {isSelected && (
                        <input
                          type="text"
                          className="w-20 text-right"
                          defaultValue={amount}
                          autoComplete="off"
                          autoFocus={false}
                          onBlur={(e) => {
                            setBudgetPartidasSelected((state) =>
                              state.map((budgetPartidaSelected) => {
                                if (budgetPartidaSelected.idV4 != idV4)
                                  return budgetPartidaSelected

                                return {
                                  ...budgetPartidaSelected,
                                  amount: Number(e.target.value),
                                }
                              })
                            )
                          }}
                        />
                      )}
                    </td>
                  </tr>
                )
              ),
              <tr key={v4()} className="text-black">
                <td className="text-xs py-3 px-4 text-center" colSpan={2}>
                  <b>TOTAL</b>
                </td>
                <td className="text-xs py-3 px-4 text-right">
                  <b>
                    {sumAmountDisponibilidades.budgetPartidaDisponibilidades}
                  </b>
                </td>
              </tr>,
            ]}
          </tbody>
        </table>
      </>
    </ModalSimple>
  )
}

export default memo(GeneralBudgetPartidasSelected)
