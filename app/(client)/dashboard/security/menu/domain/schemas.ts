import { zConfig } from "@/app/(client)/layout";
import { z } from "zod";

export const MenuSchema = zConfig.object({
  id: zConfig.number(),
  name: zConfig.string().trim().min(1).max(100),
  icon: zConfig.string().trim().min(1).max(100),
});

const MenuCreateExtendSchema = MenuSchema.extend({});

export const MenuCreateSchema = MenuCreateExtendSchema.pick({
  name: true,
  icon: true,
});

export type MenuCreateType = z.infer<typeof MenuCreateSchema>;

export const MenuEditSchema = MenuCreateSchema;

export type MenuEditType = z.infer<typeof MenuEditSchema>;
