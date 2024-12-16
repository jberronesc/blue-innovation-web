import React from "react"
import { v4 } from "uuid"
import { ExpenseExecutionBudgetCommitmentAffectationCreateFormTypeClient } from "../../[expenseExecutionBudgetCommitmentId]/expense-execution-budget-commitment-affectation/domain/schemas"
import { ButtonSimple } from "@/app/(client)/shared/ui/components/button/ButtonSimple"
import { IconEdit, IconTrashXFilled } from "@tabler/icons-react"
import { TableNative, TNHC, TNBR, TNBC } from "@component/table"

const TableAffectation = ({
  affectations,
  onEdit,
  onDelete,
}: {
  affectations: ExpenseExecutionBudgetCommitmentAffectationCreateFormTypeClient[]
  onEdit: (
    affectation: ExpenseExecutionBudgetCommitmentAffectationCreateFormTypeClient
  ) => void
  onDelete: (
    affectation: ExpenseExecutionBudgetCommitmentAffectationCreateFormTypeClient
  ) => void
}) => {
  return (
    <TableNative
      theadTrs={[
        <TNHC key={v4()}>Item Partida</TNHC>,
        <TNHC key={v4()}>SubTotales</TNHC>,
        <TNHC key={v4()}>Retenciones renta</TNHC>,
        <TNHC key={v4()}>Retenciones Iva</TNHC>,
        <TNHC key={v4()}>Monto</TNHC>,
        <TNHC key={v4()}>Acciones</TNHC>,
      ]}
    >
      {affectations?.map((affectation) => (
        <TNBR key={v4()}>
          <TNBC className="max-w-72">
            Partida:
            <br />
            <b>{affectation.budgetPartida.label}</b>
            <br />
            Type: {affectation.type}
            <br />
            Ubg: {affectation.ubg}
            <br />
            Fte: {affectation.fte}
          </TNBC>
          <TNBC>
            SubTotal 0%: <br />
            <div className="text-right"> {affectation.subTotal0}</div>
            <br />
            SubTotal Diferente 0%: <br />
            <div className="text-right">{affectation.subTotalDifferent0}</div>
          </TNBC>
          <TNBC>
            Base Imponible No Retenido: <br />
            <div className="text-right">
              {affectation.baseImponibleNoRetention}
            </div>
            <br />
            Base Imponible Renta: <br />
            <div className="text-right"> {affectation.baseImponibleRenta}</div>
            <br />
            Codigo Retencion Renta: <br />
            {affectation.codeRetentionRenta?.label ?? "------"}
            <br />
            Total Retenido Renta: <br />
            <div className="text-right"> {affectation.totalRetentionRenta}</div>
          </TNBC>
          <TNBC>
            Base Imponible Iva: <br />
            <div className="text-right"> {affectation.baseImponibleIva}</div>
            <br />
            Codigo Retencion Iva: <br />
            {affectation.codeRetentionIva?.label ?? "------"}
            <br />
            Total Retenido Iva: <br />
            <div className="text-right"> {affectation.totalRetentionIva}</div>
          </TNBC>
          <TNBC className="text-right">{affectation.amount}</TNBC>
          <TNBC>
            <div className="flex justify-center gap-3">
              <ButtonSimple onClick={() => onEdit(affectation)}>
                <IconEdit />
              </ButtonSimple>
              <ButtonSimple onClick={() => onDelete(affectation)}>
                <IconTrashXFilled />
              </ButtonSimple>
            </div>
          </TNBC>
        </TNBR>
      ))}
    </TableNative>
  )
}

export default TableAffectation
