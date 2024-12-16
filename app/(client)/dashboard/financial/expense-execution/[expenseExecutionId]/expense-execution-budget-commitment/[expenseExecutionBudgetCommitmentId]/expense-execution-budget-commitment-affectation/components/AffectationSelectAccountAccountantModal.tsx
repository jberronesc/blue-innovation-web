import React, { useMemo } from "react"
import { v4 } from "uuid"
import SelectReact from "react-select"
import { ModalSimple } from "@component/modal"
import { AccountAccountantActiveEntity } from "@contad/account-accountant/domain/interfaces/AccountAccountantActiveEntity"
import { AffectationSelectAccountAccountantEntity } from "../domain/interfaces/AffectationSelectAccountAccountantEntity"

const AffectationSelectAccountAccountantModal = ({
  showModal,
  onSuccess,
  onCancel,
  affectactionSelectAccountAccountants,
  accountAccountants,
  onSelectAccountAccountant,
}: {
  showModal: boolean
  onSuccess: () => any
  onCancel: () => any
  affectactionSelectAccountAccountants: AffectationSelectAccountAccountantEntity[]
  accountAccountants: AccountAccountantActiveEntity[]
  onSelectAccountAccountant: (data: {
    budgetPartida: {
      value: number
      label: string
    }
    accountAccountant: {
      value: number
      label: string
    }
  }) => any
}) => {
  const accountAccountantsOptions = useMemo(
    () =>
      accountAccountants
        .filter((elem) => elem.budgetPartidaIncome)
        .map((elem) => ({
          value: elem.id,
          label: `${elem.account} - ${elem.description}`,
          budgetPartidaIncome: elem.budgetPartidaIncome ?? { id: 0 },
        })),
    []
  )

  return (
    <ModalSimple
      title="Escoja la cuenta contable que pertenece el item presupuestario"
      show={showModal}
      onCancel={onCancel}
      onSuccess={onSuccess}
      isDismissable={false}
    >
      <table className="min-w-full bg-white shadow-md rounded-xl">
        <thead>
          <tr className="bg-blue-gray-100 text-gray-700">
            <th key={v4()} className="py-3 px-4">
              Partida Presupuestaria
            </th>
            <th key={v4()} className="py-3 px-4">
              Cuenta contable
            </th>
          </tr>
        </thead>

        <tbody className="text-blue-gray-900">
          {[
            ...affectactionSelectAccountAccountants?.map(
              ({ budgetPartida, accountAccountant }, index) => (
                <tr
                  key={v4()}
                  className="border-b border-blue-gray-200 text-black"
                >
                  <td className="py-3 px-4">
                    <span className="font-bold underline decoration-red-500 text-sm">
                      {budgetPartida.label}
                    </span>
                  </td>
                  <td className="text-xs py-3 px-4 text-right">
                    <SelectReact
                      autoFocus={false}
                      options={accountAccountantsOptions.filter(
                        (accountAccountant) =>
                          accountAccountant.budgetPartidaIncome.id ===
                          budgetPartida.value
                      )}
                      defaultValue={accountAccountant}
                      className="text-black basic-single w-72"
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({
                          ...base,
                          zIndex: 1000,
                          color: "black",
                        }),
                      }}
                      onChange={(e) => {
                        if (!e) return

                        onSelectAccountAccountant({
                          budgetPartida,
                          accountAccountant: e,
                        })

                        return e
                      }}
                    />
                  </td>
                </tr>
              )
            ),
          ]}
        </tbody>
      </table>
    </ModalSimple>
  )
}

export default AffectationSelectAccountAccountantModal
