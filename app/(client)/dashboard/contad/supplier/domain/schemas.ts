import { zConfig } from "@/app/(client)/layout"
import { z } from "zod"

export const SupplierSchema = zConfig.object({
  id: zConfig.number(),
  typeContributor: zConfig.object({
    value: zConfig.string(),
    label: zConfig.string(),
  }),
  typeIdentification: zConfig.object({
    value: zConfig.string(),
    label: zConfig.string(),
  }),
  dni: zConfig.string().trim().min(1).max(100),
  firstName: zConfig.string().trim().min(1).max(100),
  lastName: zConfig.string().trim().min(1).max(100),
  nameReasonSocial: zConfig.string().trim().min(1).max(100),
  legalRepresentative: zConfig.string().trim().min(1).max(100),
  direction: zConfig.string().trim().min(1).max(100),
  phone: zConfig.string().trim().min(1).max(100),
  email: zConfig.string().email().trim().min(1).max(100),
})

const SupplierCreateSchemaClient = SupplierSchema.extend({})

export const SupplierCreateFormSchemaClient = SupplierCreateSchemaClient.pick({
  typeContributor: true,
  typeIdentification: true,
  dni: true,
  firstName: true,
  lastName: true,
  nameReasonSocial: true,
  legalRepresentative: true,
  direction: true,
  phone: true,
  email: true,
})

export type SupplierCreateFormTypeClient = z.infer<
  typeof SupplierCreateFormSchemaClient
>

const SupplierEditSchemaClient = SupplierSchema.extend({})

export const SupplierEditFormSchemaClient = SupplierEditSchemaClient.pick({
  typeContributor: true,
  typeIdentification: true,
  dni: true,
  firstName: true,
  lastName: true,
  nameReasonSocial: true,
  legalRepresentative: true,
  direction: true,
  phone: true,
  email: true,
})

export type SupplierEditFormTypeClient = z.infer<
  typeof SupplierEditFormSchemaClient
>
