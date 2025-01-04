import { zConfig } from "@/app/(client)/layout";
import { z } from "zod";

export const DecentralizedUnitSchema = zConfig.object({
  id: zConfig.number(),
  code: zConfig.string().trim().min(1).max(10),
  description: zConfig.string().trim().min(1).max(500),
});

const DecentralizedUnitCreateExtendSchema = DecentralizedUnitSchema.extend({});

export const DecentralizedUnitCreateSchema =
  DecentralizedUnitCreateExtendSchema.pick({
    code: true,
    description: true,
  });

export type DecentralizedUnitCreateType = z.infer<
  typeof DecentralizedUnitCreateSchema
>;

export const DecentralizedUnitEditSchema = DecentralizedUnitCreateSchema;

export type DecentralizedUnitEditType = z.infer<
  typeof DecentralizedUnitEditSchema
>;
