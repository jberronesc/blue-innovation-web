import {
  IncomeXCobrarAccountAccountant,
  IncomeXCobrarTransaction,
} from "./IncomeXCobrarSupplierInfoEntity"

export type IncomeXCobrarSupplierInfoSelected = {
  incomeXCobrarsResult: {
    isSelected: boolean
    amountSelected: number
    id: number
    transaction: IncomeXCobrarTransaction
    amount: number
    balance: number
    isCollected: boolean
    incomeXCobrarDetails: {
      isSelected: boolean
      amountSelected: number
      id: number
      incomeAffectation: {
        id: number
        cs: string
        type: string
        ubg: string
        fte: string
        geo: string
        amount: number
      }
      accountAccountant: IncomeXCobrarAccountAccountant
      amount: number
      balance: number
      isCollected: boolean
    }[]
  }[]
  expenseXPaysResult: {
    isSelected: boolean
    amountSelected: number
    id: number
    transaction: IncomeXCobrarTransaction
    amount: number
    balance: number
    isPaid: boolean
    expenseXPayDetails: {
      isSelected: boolean
      amountSelected: number
      id: number
      expenseAffectation: {
        id: number
        cs: string
        type: string
        ubg: string
        fte: string
        geo: string
        amount: number
      }
      accountAccountant: IncomeXCobrarAccountAccountant
      amount: number
      balance: number
      isPaid: boolean
    }[]
  }[]
}
