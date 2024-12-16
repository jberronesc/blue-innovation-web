import { z } from "zod"
import { zConfig } from "@/app/(client)/layout"

export const GroupSchema = zConfig.object({
  id: zConfig.number(),
  name: zConfig.string().trim().min(1),
  securityGroupModulePermissions: zConfig
    .array(
      zConfig.object({
        moduleId: zConfig.number(),
        permissions: zConfig.number().array().optional(),
      })
    )
    .optional(),
})

const GroupCreateExtendSchema = GroupSchema.extend({})

export const GroupCreateSchema = GroupCreateExtendSchema.pick({
  name: true,
})

export type GroupCreateType = z.infer<typeof GroupCreateSchema>

const GroupEditExtendSchema = GroupSchema.extend({})

export const GroupEditSchema = GroupEditExtendSchema.pick({
  name: true,
})

export type GroupEditType = z.infer<typeof GroupEditSchema>
