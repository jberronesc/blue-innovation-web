import { z } from "zod"

const SelectZod = {
  objectOptionalNumber: z
    .object({
      value: z.number(),
      label: z.string(),
    })
    .optional(),
  objectOptionalString: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .optional(),
}

export default SelectZod
