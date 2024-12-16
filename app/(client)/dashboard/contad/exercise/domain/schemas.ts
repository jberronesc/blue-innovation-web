import { zConfig } from "@/app/(client)/layout"
import { z } from "zod"

export const ExerciseSchema = zConfig.object({
  id: zConfig.number(),
})

const ExerciseCreateExtendSchema = ExerciseSchema.extend({})

export const ExerciseCreateSchema = ExerciseCreateExtendSchema.pick({})

export type ExerciseCreateType = z.infer<typeof ExerciseCreateSchema>
