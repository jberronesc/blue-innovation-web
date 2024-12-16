"use client"

import Select from "react-select"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FieldError, useForm } from "react-hook-form"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { ButtonSimple, ButtonsCreate, ButtonCancel } from "@component/button"
import { ErrorField } from "@component/form"
import { LabelSimple } from "@component/label"
import { SelectReactSimple } from "@component/select"
import { AccountAccountantActiveEntity } from "@contad/account-accountant/domain/interfaces/AccountAccountantActiveEntity"
import { TypeRetentionActiveEntity } from "@financial/type-retention/domain/interfaces/TypeRetentionActiveEntity"
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import AffectationModal from "../../[expenseExecutionBudgetCommitmentId]/expense-execution-budget-commitment-affectation/components/affectation-modal"
import AffectationSelectAccountAccountantModal from "../../[expenseExecutionBudgetCommitmentId]/expense-execution-budget-commitment-affectation/components/AffectationSelectAccountAccountantModal"
import { AffectationSelectAccountAccountantEntity } from "../../[expenseExecutionBudgetCommitmentId]/expense-execution-budget-commitment-affectation/domain/interfaces/AffectationSelectAccountAccountantEntity"
import { ExpenseExecutionBudgetCommitmentAffectationCreateFormTypeClient } from "../../[expenseExecutionBudgetCommitmentId]/expense-execution-budget-commitment-affectation/domain/schemas"
import ExpenseExecutionBudgetCommitmentConstCli from "../../domain/constantClient"
import {
  ExpenseExecutionBudgetCommitmentActiveEntity,
  BudgetCommitmentDetailsBudgetCommitment,
} from "../../domain/interfaces/ExpenseExecutionBudgetCommitmentActiveEntity"
import {
  BudgetCommitmentSelectionCreateFormTypeClient,
  BudgetCommitmentSelectionCreateFormSchemaClient,
} from "../../domain/schemas"
import TableAffectation from "./TableAffectation"

export default function ExpenseExecutionBudgetCommitmentCreateForm({
  params,
  expenseExecutionBudgetCommitmentActives,
  typeRetentionActives,
  accountAccountants,
}: {
  expenseExecutionBudgetCommitmentActives: ExpenseExecutionBudgetCommitmentActiveEntity[]
  params: { expenseExecutionId: string }
  typeRetentionActives: TypeRetentionActiveEntity[]
  accountAccountants: AccountAccountantActiveEntity[]
}) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const [affectationModal, setAffectationModal] = useState(false)
  const [affectations, setAffectations] = useState<
    ExpenseExecutionBudgetCommitmentAffectationCreateFormTypeClient[]
  >([])
  const [budgetCommitment, setBudgetCommitment] = useState<
    ExpenseExecutionBudgetCommitmentActiveEntity | undefined
  >(undefined)
  const [affectactionSelected, setAffectactionSelected] = useState<
    ExpenseExecutionBudgetCommitmentAffectationCreateFormTypeClient | undefined
  >(undefined)
  const [
    affectationSelectAccountAccountantModalShow,
    setAffectationSelectAccountAccountantModalShow,
  ] = useState(false)
  const [
    affectactionSelectAccountAccountants,
    setAffectactionSelectAccountAccountants,
  ] = useState<AffectationSelectAccountAccountantEntity[]>([])

  const {
    formState: { errors },
    control,
    handleSubmit,
    getValues,
    watch,
  } = useForm<BudgetCommitmentSelectionCreateFormTypeClient>({
    resolver: zodResolver(BudgetCommitmentSelectionCreateFormSchemaClient),
  })
  const watchBudgetCommitment = watch("budgetCommitment")
  const [
    budgetCommitmentDetailsBudgetCommitmentAvailable,
    setBudgetCommitmentDetailsBudgetCommitmentAvailable,
  ] = useState<BudgetCommitmentDetailsBudgetCommitment[]>([])
  const expenseExecutionBudgetCommitmentActivesOptions =
    expenseExecutionBudgetCommitmentActives.map((elem) => ({
      label: `Compromiso Nº: ${elem.sequence} | Fecha: ${elem.date} | Saldo: ${elem.balance} | Doc. Ref.: ${elem.documentReference}`,
      value: elem.id,
    }))

  const vmLoading = ViewModelLoading({})
  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      const data = getValues()
      vmLoading.loadingSimple()

      return (
        await new FetchPOSTTokenBlueI({
          url: `/v1/expense-execution-budget-commitments/expense-executions/${params.expenseExecutionId}`,
          body: {
            budgetCommitment: data.budgetCommitment.value,
            expenseExecutionBudgetCommitmentAffectations: affectations.map(
              (affectation) => ({
                ...affectation,
                codeRetentionRenta: affectation.codeRetentionRenta?.value,
                codeRetentionIva: affectation.codeRetentionIva?.value,
                budgetPartida: affectation.budgetPartida.value,
                accountAccountant: affectactionSelectAccountAccountants.find(
                  (elem) =>
                    elem.budgetPartida.value == affectation.budgetPartida.value
                )?.accountAccountant?.value,
              })
            ),
          },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registro creado con exito!." })
          replace(
            ExpenseExecutionBudgetCommitmentConstCli.listUrlBack({
              url: ExpenseExecutionBudgetCommitmentConstCli.listUrl({
                ...params,
              }),
              searchParams,
            })
          )
        }
      )
    },
  })

  return (
    <>
      {modal}
      {budgetCommitment && (
        <AffectationModal
          showModal={affectationModal}
          onSuccess={(
            dataSuccess: ExpenseExecutionBudgetCommitmentAffectationCreateFormTypeClient
          ) => {
            if (affectactionSelected) {
              setAffectations(
                affectations.map((affectation) =>
                  affectation.id === affectactionSelected.id
                    ? dataSuccess
                    : affectation
                )
              )
              setAffectactionSelected(undefined)
            } else {
              setAffectations([...affectations, dataSuccess])
            }

            setAffectationModal(false)
          }}
          onCancel={() => setAffectationModal(false)}
          typeRetentionActives={typeRetentionActives}
          budgetCommitment={budgetCommitment}
          budgetCommitmentDetailsBudgetCommitment={
            budgetCommitmentDetailsBudgetCommitmentAvailable
          }
          affectactionSelected={affectactionSelected}
        />
      )}
      <AffectationSelectAccountAccountantModal
        affectactionSelectAccountAccountants={
          affectactionSelectAccountAccountants
        }
        accountAccountants={accountAccountants}
        showModal={affectationSelectAccountAccountantModalShow}
        onSuccess={openModal}
        onCancel={() => setAffectationSelectAccountAccountantModalShow(false)}
        onSelectAccountAccountant={(data) => {
          setAffectactionSelectAccountAccountants(
            affectactionSelectAccountAccountants.map((affectation) =>
              affectation.budgetPartida.value == data.budgetPartida.value
                ? {
                    ...affectation,
                    accountAccountant: data.accountAccountant,
                  }
                : affectation
            )
          )
        }}
      />
      <form
        onSubmit={handleSubmit(() => {
          const AffectactionSelectAccountAccountantsLocal = affectations.map(
            (affectation) => ({
              id: affectation.id,
              budgetPartida: affectation.budgetPartida,
              accountAccountant: undefined,
            })
          )
          console.log(AffectactionSelectAccountAccountantsLocal)
          setAffectactionSelectAccountAccountants(
            AffectactionSelectAccountAccountantsLocal
          )
          setAffectationSelectAccountAccountantModalShow(true)
        })}
      >
        <div className="form-sections-inputs">
          <SelectReactSimple
            label={
              <LabelSimple
                name="budgetCommitment"
                label="Compromisos presupuestarios"
              />
            }
            input={
              <Controller
                name="budgetCommitment"
                control={control}
                render={({ field }) => (
                  <Select
                    instanceId={10}
                    {...field}
                    options={expenseExecutionBudgetCommitmentActivesOptions}
                    className="text-black"
                    onChange={(...event: any[]) => {
                      setBudgetCommitment(
                        expenseExecutionBudgetCommitmentActives.find(
                          (elem) => elem.id === event[0].value
                        )
                      )
                      return field.onChange(...event)
                    }}
                  />
                )}
              />
            }
            errors={
              <ErrorField field={errors.budgetCommitment as FieldError} />
            }
          />
          {watchBudgetCommitment && (
            <ButtonSimple
              onClick={() => {
                setBudgetCommitmentDetailsBudgetCommitmentAvailable(
                  budgetCommitment?.budgetCommitmentDetailsBudgetCommitment.filter(
                    (elem) =>
                      !affectations.some(
                        (affectation) => affectation.id == elem.id
                      )
                  ) ?? []
                )
                setAffectactionSelected(undefined)
                setAffectationModal(true)
              }}
            >
              Adicionar afectacion
            </ButtonSimple>
          )}
          <TableAffectation
            affectations={affectations}
            onEdit={(affectation) => {
              setBudgetCommitmentDetailsBudgetCommitmentAvailable(
                budgetCommitment?.budgetCommitmentDetailsBudgetCommitment.filter(
                  (elem) =>
                    !affectations.some(
                      (affectation) =>
                        affectation.budgetPartida.value == elem.budgetPartida.id
                    ) ||
                    elem.budgetPartida.id === affectation.budgetPartida.value
                ) ?? []
              )
              setAffectactionSelected(
                affectations.find(
                  (elem) =>
                    elem.budgetPartida.value === affectation.budgetPartida.value
                )
              )
              setAffectationModal(true)
            }}
            onDelete={(affectation) =>
              setAffectations(
                affectations.filter(
                  (elem) =>
                    elem.budgetPartida.value !== affectation.budgetPartida.value
                )
              )
            }
          />
        </div>
        <ButtonsCreate saveLabel="Escojer cuentas para partidas">
          <ButtonCancel
            href={ExpenseExecutionBudgetCommitmentConstCli.listUrl({
              ...params,
            })}
            persists={ExpenseExecutionBudgetCommitmentConstCli.getPerst()}
          />
        </ButtonsCreate>
      </form>
    </>
  )
}
