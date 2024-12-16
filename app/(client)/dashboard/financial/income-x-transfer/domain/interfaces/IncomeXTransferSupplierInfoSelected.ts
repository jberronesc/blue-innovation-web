import {
  IncomeXTransferAccountAccountant,
  IncomeXTransferTransaction,
} from "./IncomeXTransferSupplierInfoEntity"

export type IncomeXTransferSupplierInfoSelected = {
  isSelected: boolean
  amountSelected: number
  id: number
  transaction: IncomeXTransferTransaction
  amount: number
  balance: number
  isTransferred: boolean
  accountAccountant: IncomeXTransferAccountAccountant
  incomeXTransferDetails: {
    isSelected: boolean
    amountSelected: number
    id: number
    amount: number
    balance: number
    isTransferred: boolean
  }[]
}
