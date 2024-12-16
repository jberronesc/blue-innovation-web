"use client"

import { v4 } from "uuid"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, FieldError, useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import SelectReact from "react-select"
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { ButtonSimple, ButtonsCreate } from "@component/button"
import { DateSimple } from "@component/date"
import { ErrorField } from "@component/form"
import { TextAreaSimple } from "@component/input"
import { LabelSimple } from "@component/label"
import { SelectReactSimple } from "@component/select"
import { TableSimple } from "@component/table"
import { AccountAccountantActiveEntity } from "@contad/account-accountant/domain/interfaces/AccountAccountantActiveEntity"
import GeneralJournalConstCli from "@contad/general-journal/domain/constantClient"
import { AccountAccountantSelectedType } from "@contad/general-journal/domain/interfaces/AccountAccountantSelectedType"
import {
  GeneralJournalBudgetPartida,
  GeneralJournalInfo,
} from "@contad/general-journal/domain/interfaces/GeneralJournalInfoEntity"
import {
  GeneralJournalCreateFormTypeClient,
  GeneralJournalCreateFormSchemaClient,
} from "@contad/general-journal/domain/schemas"
import { TableColumn, TableRow, TableCell } from "@nextui-org/react"
import { FetchPOSTTokenBlueI } from "@utils/fetch/fetchBlueInnovation"
import ToastifyUtil from "@utils/toastify/toastify"
import { ViewModelConfirmModal } from "@viewM/ViewModelConfirmModal"
import { ViewModelLoading } from "@viewM/ViewModelLoading"
import GeneralBudgetPartidasSelected from "./GeneralBudgetPartidasSelected"
import GeneralJournalAccountsSelected from "./GeneralJournalAccountsSelected"

export default function GeneralJournalCreateForm({
  budgetPartidas,
  accountAccountants,
  generalJournalInfo,
}: {
  budgetPartidas: GeneralJournalBudgetPartida[]
  accountAccountants: AccountAccountantActiveEntity[]
  generalJournalInfo: GeneralJournalInfo
}) {
  // https://www.material-tailwind.com/docs/html/textarea
  const { replace, push, back, forward, prefetch, refresh } = useRouter()
  const [debits, setDebits] = useState<AccountAccountantSelectedType[]>([])
  const [credits, setCredits] = useState<AccountAccountantSelectedType[]>([])
  const [budgetPartidasSelected, setBudgetPartidasSelected] = useState<
    {
      idV4: string
      amount: number
      isSelected: boolean
      budgetPartida: GeneralJournalBudgetPartida
    }[]
  >(
    budgetPartidas.map((budgetPartida) => ({
      idV4: v4(),
      amount: 0,
      isSelected: false,
      budgetPartida,
    }))
  )
  const [sumAccounts, setSumAccounts] = useState<{
    debit: number
    credit: number
  }>({
    debit: 0,
    credit: 0,
  })
  const [sumAmountDisponibilidades, setSumAmountDisponibilidades] = useState<{
    accountAccounantDisponibilidades: number
    budgetPartidaDisponibilidades: number
  }>({
    accountAccounantDisponibilidades: 0,
    budgetPartidaDisponibilidades: 0,
  })

  const [modalDisponibilidad, setModalDisponibilidad] = useState<boolean>(false)

  useEffect(() => {
    setSumAccounts({
      ...sumAccounts,
      credit: credits.reduce((accum, current) => accum + current.amount, 0),
      debit: debits.reduce((accum, current) => accum + current.amount, 0),
    })
  }, [credits, debits])

  useEffect(() => {
    setSumAmountDisponibilidades({
      ...sumAmountDisponibilidades,
      budgetPartidaDisponibilidades: budgetPartidasSelected.reduce(
        (accum, current) => accum + current.amount,
        0
      ),
    })
  }, [budgetPartidasSelected])

  const {
    control,
    formState: { errors },
    register,
    handleSubmit,
    getValues,
    setValue,
  } = useForm<GeneralJournalCreateFormTypeClient>({
    resolver: zodResolver(GeneralJournalCreateFormSchemaClient),
    defaultValues: {
      supplier: generalJournalInfo.typeTransactionisNormal
        ? undefined
        : {
            value: generalJournalInfo.companyInfo?.supplier.id,
            label: `${generalJournalInfo.companyInfo?.supplier.firstName} - ${generalJournalInfo.companyInfo?.supplier.lastName} - ${generalJournalInfo.companyInfo?.supplier.dni}`,
          },
      date: generalJournalInfo.dateOperationMin,
    },
  })

  const optionEmpty = {
    value: 0,
    label: "--------",
    account: "",
    description: "",
    subgroup: "",
  }

  const accountAccountantsOptions = useMemo(
    () => [
      optionEmpty,
      ...accountAccountants.map((elem) => ({
        value: elem.id,
        label: `${elem.account} - ${elem.description}`,
        account: elem.account,
        description: elem.description,
        subgroup: elem.account.split(".")[0],
      })),
    ],
    []
  )

  const suppliersOptions = useMemo(
    () => [
      ...generalJournalInfo.suppliers.map((elem) => ({
        value: elem.id,
        label: `${elem.firstName} - ${elem.lastName} - ${elem.dni}`,
      })),
    ],
    []
  )

  const vmLoading = ViewModelLoading({})

  const { openModal, modal } = ViewModelConfirmModal({
    onSuccess: async () => {
      const data = getValues()

      if (credits.length <= 0 || debits.length <= 0)
        return ToastifyUtil.error("No puede enviar debitos o haberes vacios.")

      if (
        sumAccounts.credit <= 0 ||
        sumAccounts.debit <= 0 ||
        sumAccounts.credit != sumAccounts.debit
      )
        return ToastifyUtil.error(
          "La sumatorias deben ser iguales y mayores que cero."
        )

      if (
        debits.some(
          (debit) => debit.accountAccountant.value == 0 || debit.amount <= 0
        )
      )
        return ToastifyUtil.error(
          "Debe contiene un registro sin cuenta contable o un valor con cero."
        )

      if (
        credits.some(
          (credit) => credit.accountAccountant.value == 0 || credit.amount <= 0
        )
      )
        return ToastifyUtil.error(
          "Haber contiene un registro sin cuenta contable o un valor con cero."
        )

      if (
        generalJournalInfo.typeTransactionisOpeningOrOpeningInitial &&
        debits.some(
          (elem) =>
            elem.accountAccountant.subgroup ==
            GeneralJournalConstCli.DISPONIBILIDADES
        )
      ) {
        setSumAmountDisponibilidades({
          ...sumAmountDisponibilidades,
          budgetPartidaDisponibilidades: 0,
          accountAccounantDisponibilidades: debits
            .filter(
              (elem) =>
                elem.accountAccountant.subgroup ==
                GeneralJournalConstCli.DISPONIBILIDADES
            )
            .reduce((acc, curr) => acc + curr.amount, 0),
        })
        setBudgetPartidasSelected((states) =>
          states.map((elem) => ({
            ...elem,
            isSelected: false,
            amount: 0,
          }))
        )
        return setModalDisponibilidad(true)
      }

      vmLoading.loadingSimple()

      return (
        await new FetchPOSTTokenBlueI({
          url: "/v1/general-journals",
          body: {
            ...data,
            supplier: data.supplier.value,
            debits: debits
              .map((elem) => ({
                ...elem,
                accountAccountant: elem.accountAccountant.value,
              }))
              .filter((elem) => elem.amount > 0),
            credits: credits
              .map((elem) => ({
                ...elem,
                accountAccountant: elem.accountAccountant.value,
              }))
              .filter((elem) => elem.amount > 0),
            budgetPartidas: [],
          },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({ message: "Registroaa creado con exito!." })
          replace("/dashboard/contad/general-journal/create")
        }
      )
    },
  })

  const {
    openModal: openModal2,
    modal: modal2,
    closeModal: closeModal2,
  } = ViewModelConfirmModal({
    onSuccess: async () => {
      const data = getValues()

      if (
        sumAmountDisponibilidades.accountAccounantDisponibilidades !=
        sumAmountDisponibilidades.budgetPartidaDisponibilidades
      )
        return ToastifyUtil.error(
          "El monto disponibilidad es diferente al valor de las partidas."
        )

      if (
        budgetPartidasSelected.some(
          (elem) => elem.isSelected && elem.amount <= 0
        )
      )
        return ToastifyUtil.error("Existe partidas con valor cero.")

      vmLoading.loadingSimple()

      return (
        await new FetchPOSTTokenBlueI({
          url: "/v1/general-journals",
          body: {
            ...data,
            supplier: data.supplier.value,
            debits: debits
              .map((elem) => ({
                ...elem,
                accountAccountant: elem.accountAccountant.value,
              }))
              .filter((elem) => elem.amount > 0),
            credits: credits
              .map((elem) => ({
                ...elem,
                accountAccountant: elem.accountAccountant.value,
              }))
              .filter((elem) => elem.amount > 0),
            budgetPartidas: budgetPartidasSelected
              .map((elem) => ({
                ...elem,
                id: elem.budgetPartida.id,
              }))
              .filter((elem) => elem.amount > 0),
          },
        }).execWithoutResponse()
      ).fold(
        async (error) => vmLoading.errorSimple({ error }),
        async (_) => {
          vmLoading.succesSimple({
            message: "Asiento apertura creado con exito!.",
          })
          push("/dashboard/contad/general-journal/create")
        }
      )
    },
  })

  const addAccount = useCallback(
    (
      rows: AccountAccountantSelectedType[],
      setRow: Dispatch<SetStateAction<AccountAccountantSelectedType[]>>
    ) =>
      setRow([
        ...rows,
        {
          idV4: v4(),
          accountAccountant: optionEmpty,
          amount: 0.0,
          concept: "",
          centerCosts: [],
        },
      ]),
    []
  )

  return (
    <>
      {modal}
      {modal2}
      <GeneralBudgetPartidasSelected
        budgetPartidasSelected={budgetPartidasSelected}
        sumAmountDisponibilidades={sumAmountDisponibilidades}
        modalDisponibilidad={modalDisponibilidad}
        onSuccess={openModal2}
        onCancel={() => setModalDisponibilidad(false)}
        setBudgetPartidasSelected={setBudgetPartidasSelected}
      />

      <form onSubmit={handleSubmit(openModal)}>
        <div className="form-sections-inputs">
          <div className="w-96">
            <DateSimple
              label="Fecha"
              register={{
                ...register("date"),
                min: generalJournalInfo.dateOperationMin,
                max: generalJournalInfo.dateOperationMax,
              }}
            />
          </div>

          <div className="flex">
            <TextAreaSimple
              label="Concepto"
              register={{ ...register("concept") }}
              errors={<ErrorField field={errors.concept} />}
            />
            <div className="w-10"></div>
            <TextAreaSimple
              label="Documento referencia"
              register={{ ...register("documentReference") }}
              errors={<ErrorField field={errors.documentReference} />}
            />
          </div>
          {/*
            <SelectReactCoverSimple
            label={<LabelSimple name="supplier" label="Proveedor" />}
            control={control}
            options={suppliersOptions}
            errors={<ErrorField field={errors.supplier as FieldError} />}
          />
            */}

          <SelectReactSimple
            label={<LabelSimple name="supplier" label="Proveedor" />}
            input={
              <Controller
                name="supplier"
                control={control}
                render={({ field }) => (
                  <SelectReact
                    instanceId={1}
                    {...field}
                    options={suppliersOptions}
                    className="text-black"
                  />
                )}
              />
            }
            errors={<ErrorField field={errors.supplier as FieldError} />}
          />
          <ButtonSimple onClick={() => addAccount(debits, setDebits)}>
            Adicionar debe
          </ButtonSimple>
          <GeneralJournalAccountsSelected
            rows={debits}
            accountAccountantsOptions={accountAccountantsOptions}
            setRow={setDebits}
            isDebit={true}
            sumRow={sumAccounts.debit}
          />
          <br />
          <ButtonSimple onClick={() => addAccount(credits, setCredits)}>
            Adicionar haber
          </ButtonSimple>
          <GeneralJournalAccountsSelected
            rows={credits}
            accountAccountantsOptions={accountAccountantsOptions}
            setRow={setCredits}
            isDebit={false}
            sumRow={sumAccounts.credit}
          />

          <TableSimple
            hideHeader={true}
            theadTrs={[
              <TableColumn key={v4()}>N</TableColumn>,
              <TableColumn key={v4()}>N</TableColumn>,
            ]}
          >
            {[
              <TableRow key={v4()} className="text-black">
                <TableCell className="text-center">
                  <b>TOTAL DEBE</b>
                </TableCell>
                <TableCell className="text-xs text-right">
                  <b>{sumAccounts.debit}</b>
                </TableCell>
              </TableRow>,
              <TableRow key={v4()} className="text-black">
                <TableCell className="text-center">
                  <b>TOTAL HABER</b>
                </TableCell>
                <TableCell className="text-xs text-right">
                  <b>{sumAccounts.credit}</b>
                </TableCell>
              </TableRow>,
            ]}
          </TableSimple>
        </div>
        <ButtonsCreate>
          <></>
        </ButtonsCreate>
      </form>
    </>
  )
}
