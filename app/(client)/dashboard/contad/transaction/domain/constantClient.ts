import { TypeStructure } from "@utils/types/TypeStructure"

const TransactionConstCli = {
  pQ: {
    page: "page",
    query: "query",
    sequence: "sequence",
    sequenceType: "sequenceType",
    dateStart: "dateStart",
    dateEnd: "dateEnd",
    type: "type",
    classRegister: "classRegister",
  },
  persistWhenClean: {},
  getPerst: () => [TransactionConstCli.pQ],
  listUrl: ({}) => "/dashboard/contad/transaction/list",
}

export default TransactionConstCli

export const TransactionType: { [x: string]: TypeStructure } = {
  ADQ: {
    label: "ADQ",
    value: "ADQ",
    color: "primary",
  },
  EGR: {
    label: "EGR",
    value: "EGR",
    color: "primary",
  },
  EGRM: {
    label: "EGRM",
    value: "EGRM",
    color: "primary",
  },
  EGRSA: {
    label: "EGRSA",
    value: "EGRSA",
    color: "primary",
  },
  INGM: {
    label: "INGM",
    value: "INGM",
    color: "primary",
  },
  INGV: {
    label: "INGV",
    value: "INGV",
    color: "primary",
  },
  DG: {
    label: "DG",
    value: "DG",
    color: "primary",
  },
  CREDB: {
    label: "CREDB",
    value: "CREDB",
    color: "primary",
  },
  DEBB: {
    label: "DEBB",
    value: "DEBB",
    color: "primary",
  },
  NCC: {
    label: "NCC",
    value: "NCC",
    color: "primary",
  },
  NCV: {
    label: "NCV",
    value: "NCV",
    color: "primary",
  },
  INVI: {
    label: "INVI",
    value: "INVI",
    color: "primary",
  },
  INVD: {
    label: "INVD",
    value: "INVD",
    color: "primary",
  },
  VTA: {
    label: "VTA",
    value: "VTA",
    color: "primary",
  },
  DEPR: {
    label: "DEPR",
    value: "DEPR",
    color: "primary",
  },
  BAJAF: {
    label: "BAJAF",
    value: "BAJAF",
    color: "primary",
  },
  ANU: {
    label: "ANU",
    value: "ANU",
    color: "primary",
  },
  RM: {
    label: "RM",
    value: "RM",
    color: "primary",
  },
  EGG: {
    label: "EGG",
    value: "EGG",
    color: "primary",
  },
  EGA: {
    label: "EGA",
    value: "EGA",
    color: "primary",
  },
  RC: {
    label: "RC",
    value: "RC",
    color: "primary",
  },
  PI: {
    label: "PI",
    value: "PI",
    color: "primary",
  },
  DICR: {
    label: "DICR",
    value: "DICR",
    color: "primary",
  },
  OG: {
    label: "OG",
    value: "OG",
    color: "primary",
  },
  RVS: {
    label: "RVS",
    value: "RVS",
    color: "primary",
  },
  CCC: {
    label: "CCC",
    value: "CCC",
    color: "primary",
  },
  CCCP: {
    label: "CCCP",
    value: "CCCP",
    color: "primary",
  }, // COMPENSACION CRUCE CUENTAS PERCIBIDOS
  CCCA: {
    label: "CCCA",
    value: "CCCA",
    color: "primary",
  }, // COMPENSACION CRUCE CUENTAS ANTICIPOS
  RCA: {
    label: "RCA",
    value: "RCA",
    color: "primary",
  },
  RCC: {
    label: "RCC",
    value: "RCC",
    color: "primary",
  },
  CCIG: {
    label: "CCIG",
    value: "CCIG",
    color: "primary",
  },
}

export const TransactionTypeOptions: TypeStructure[] = [
  TransactionType.ADQ,
  TransactionType.EGR,
  TransactionType.EGRM,
  TransactionType.EGRSA,
  TransactionType.INGM,
  TransactionType.INGV,
  TransactionType.DG,
  TransactionType.CREDB,
  TransactionType.DEBB,
  TransactionType.NCC,
  TransactionType.NCV,
  TransactionType.INVI,
  TransactionType.INVD,
  TransactionType.VTA,
  TransactionType.DEPR,
  TransactionType.BAJAF,
  TransactionType.ANU,
  TransactionType.RM,
  TransactionType.EGG,
  TransactionType.EGA,
  TransactionType.RC,
  TransactionType.PI,
  TransactionType.DICR,
  TransactionType.OG,
  TransactionType.RVS,
  TransactionType.CCC,
  TransactionType.RCA,
  TransactionType.RCC,
  TransactionType.CCIG,
]

export const TransactionClassRegister: { [x: string]: TypeStructure } = {
  COM: {
    label: "COMPROMETIDO",
    value: "COM",
    color: "primary",
  },
  DEV: {
    label: "DEVENGADO",
    value: "DEV",
    color: "primary",
  },
  COM_Y_DEV: {
    label: "COMPROMETIDO Y DEVENGADO",
    value: "COM_Y_DEV",
    color: "primary",
  },
  RTO: {
    label: "REVERTIDO",
    value: "RTO",
    color: "primary",
  },
  PG: {
    label: "PAGO DE GASTOS",
    value: "PG",
    color: "primary",
  },
  PI: {
    label: "PERCIBIDO DE INGRESOS",
    value: "PI",
    color: "primary",
  },
  ANTICIPOS: {
    label: "ANTICIPOS",
    value: "ANTICIPOS",
    color: "primary",
  },
  COMPENSACI: {
    label: "COMPENSACION",
    value: "COMPENSACI",
    color: "primary",
  },
  ING_P_APL: {
    label: "INGRESO PENDIENTE DE APLICACION",
    value: "ING_P_APL",
    color: "primary",
  },
  RCC: {
    label: "RECLASIFICACION CONTABLE",
    value: "RCC",
    color: "primary",
  },
}

export const TransactionClassRegisterOptions: TypeStructure[] = [
  TransactionClassRegister.COM,
  TransactionClassRegister.DEV,
  TransactionClassRegister.COM_Y_DEV,
  TransactionClassRegister.RTO,
  TransactionClassRegister.PG,
  TransactionClassRegister.PI,
  TransactionClassRegister.ANTICIPOS,
  TransactionClassRegister.COMPENSACI,
  TransactionClassRegister.ING_P_APL,
  TransactionClassRegister.RCC,
]
