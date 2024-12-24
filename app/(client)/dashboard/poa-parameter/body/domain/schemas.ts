import { zConfig } from "@/app/(client)/layout";
import { z } from "zod";

export const BodySchema = zConfig.object({
  id: zConfig.number(),
  code: zConfig.string().trim().min(1).max(10),
  description: zConfig.string().trim().min(1).max(500),
});

const BodyCreateExtendSchema = BodySchema.extend({});

export const BodyCreateSchema = BodyCreateExtendSchema.pick({
  code: true,
  description: true,
});

export type BodyCreateType = z.infer<typeof BodyCreateSchema>;

const BodyEditExtendSchema = BodySchema.extend({});

export const BodyEditSchema = BodyEditExtendSchema.pick({
  code: true,
  description: true,
});

export type BodyEditType = z.infer<typeof BodyEditSchema>;
