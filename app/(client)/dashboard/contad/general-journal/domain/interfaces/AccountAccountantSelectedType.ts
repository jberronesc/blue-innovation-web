export type AccountAccountantSpecificType = {
  value: number
  label: string
  account: string
  description: string
  subgroup: string
}

export type AccountAccountantSelectedType = {
  idV4: string
  accountAccountant: AccountAccountantSpecificType
  amount: number
  concept: string
  centerCosts: {
    id: number
    name: string
  }[]
}
