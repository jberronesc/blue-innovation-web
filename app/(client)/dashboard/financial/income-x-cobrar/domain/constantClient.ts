import { TransactionClassRegister } from "@contad/transaction/domain/constantClient"
import { TypeStructure } from "@utils/types/TypeStructure"

const IncomeXCobrarConstCli = {
  pQ: {
    page: "page",
    query: "query",
  },
  persistWhenClean: {},
  getPerst: () => [IncomeXCobrarConstCli.pQ],
}

export default IncomeXCobrarConstCli

export const IncomeXCobrarTransactionClassRegisterOptions: TypeStructure[] = [
  TransactionClassRegister.PI,
  TransactionClassRegister.COMPENSACI,
]
