import { zConfig } from "@/app/(client)/layout"
import { z } from "zod"

export const UserSchema = zConfig.object({
  id: zConfig.number(),
  username: zConfig
    .string()
    .trim()
    .min(1)
    .max(10, { message: "Maximo 10 caracteres." }),
  password: zConfig
    .string({ required_error: "password is required" })
    .min(1)
    .trim(),
  passwordConfirm: zConfig.string().trim(),
  firstName: zConfig
    .string({
      required_error: "firstName is required",
      invalid_type_error: "firstName must be a string",
    })
    .trim()
    .min(1)
    .toUpperCase(),
  lastName: zConfig.string().trim().min(1).toUpperCase(),
  dni: zConfig.string().trim().min(1),
  email: zConfig.string().trim().min(1).email(),
  isActive: zConfig.boolean(),
  groups: zConfig
    .array(
      zConfig.object({
        value: zConfig.number(),
        label: zConfig.string(),
      })
    )
    .optional(),
})

const UserCreateExtendSchema = UserSchema.extend({})

export const UserCreateSchema = UserCreateExtendSchema.pick({
  password: true,
  passwordConfirm: true,
  username: true,
  firstName: true,
  lastName: true,
  dni: true,
  email: true,
  isActive: true,
  groups: true,
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Las contraseñas no coinciden.",
  path: ["passwordConfirm"],
})

export type UserCreateType = z.infer<typeof UserCreateSchema>

export const UserEditExtendWithoutValidateSchema = UserSchema.extend({
  password: zConfig.string().trim().optional(),
  passwordConfirm: zConfig.string().trim().optional(),
})

const UserEditExtendSchema = UserEditExtendWithoutValidateSchema.extend({})

export const UserEditSchema = UserEditExtendSchema

export type UserEditType = z.infer<typeof UserEditSchema>
