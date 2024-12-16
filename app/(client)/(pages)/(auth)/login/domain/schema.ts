import { zConfig } from "@/app/(client)/layout";
import { z } from "zod";

export const LoginSchema = zConfig.object({
  username: zConfig.string().trim().min(1, "Requerido"),
  password: zConfig.string().trim().min(1, "Requerido"),
  exercise: zConfig.object({
    value: zConfig.number(),
    label: zConfig.string(),
  }),
});

export type LoginType = z.infer<typeof LoginSchema>;
