import { zConfig } from "@/app/(client)/layout"
import { z } from "zod"

export const ModuleSchema = zConfig.object({
  id: zConfig.number(),
  name: zConfig.string().trim().min(1).max(100),
  urlMatch: zConfig.string().trim().min(1).max(100),
  url: zConfig.string().trim().min(1).max(100),
  menu: zConfig.object({
    value: zConfig.number(),
    label: zConfig.string(),
  }),
  description: zConfig.string().trim().min(1).max(500),
  icon: zConfig.string().trim().min(1).max(100),
  isActive: zConfig.boolean(),
  permissions: zConfig
    .array(
      zConfig.object({
        value: zConfig.number(),
        label: zConfig.string(),
      })
    )
    .optional(),
})

const ModuleCreateExtendSchema = ModuleSchema.extend({})

export const ModuleCreateSchema = ModuleCreateExtendSchema.pick({
  name: true,
  url: true,
  urlMatch: true,
  menu: true,
  description: true,
  icon: true,
  isActive: true,
  permissions: true,
})

export type ModuleCreateType = z.infer<typeof ModuleCreateSchema>

const ModuleEditExtendSchema = ModuleSchema.extend({})

export const ModuleEditSchema = ModuleEditExtendSchema.pick({
  name: true,
  url: true,
  urlMatch: true,
  menu: true,
  description: true,
  icon: true,
  isActive: true,
  permissions: true,
})

export type ModuleEditType = z.infer<typeof ModuleEditSchema>
