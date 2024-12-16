import { TypeStructure } from "@utils/types/TypeStructure"

const SupplierConstCli = {
  pQ: {
    page: "page",
    query: "query",
  },
  persistWhenClean: {},
  getPerst: () => [SupplierConstCli.pQ],
  listUrl: ({}) => "/dashboard/contad/supplier/list",
  createUrl: ({}) => "/dashboard/contad/supplier/create",
  editUrl: ({ supplierId }: { supplierId: string | number }) =>
    `/dashboard/contad/supplier/${supplierId}/edit`,
  deleteUrl: ({ supplierId }: { supplierId: string | number }) =>
    `/dashboard/contad/supplier/${supplierId}/delete`,
}

export default SupplierConstCli

export const SupplierTypeContributor: { [x: string]: TypeStructure } = {
  PERSON_NATURE: {
    label: "PERSONAL NATURAL",
    value: "PERSON_NATURE",
    color: "primary",
  },
  SOCIETY: {
    label: "SOCIEDAD",
    value: "SOCIETY",
    color: "primary",
  },
  INSTITUTION_PUBLIC: {
    label: "INSTITUCION PUBLICA",
    value: "INSTITUTION_PUBLIC",
    color: "primary",
  },
}

export const SupplierTypeContributorOptions: TypeStructure[] = [
  SupplierTypeContributor.PERSON_NATURE,
  SupplierTypeContributor.SOCIETY,
  SupplierTypeContributor.INSTITUTION_PUBLIC,
]

export const SupplierTypeIdentification: { [x: string]: TypeStructure } = {
  RUC: {
    label: "RUC",
    value: "RUC",
    color: "primary",
  },
  DNI: {
    label: "DNI",
    value: "DNI",
    color: "primary",
  },
  PASSPORT: {
    label: "PASAPORTE",
    value: "PASSPORT",
    color: "primary",
  },
}

export const SupplierTypeIdentificationOptions: TypeStructure[] = [
  SupplierTypeIdentification.RUC,
  SupplierTypeIdentification.DNI,
  SupplierTypeIdentification.PASSPORT,
]
