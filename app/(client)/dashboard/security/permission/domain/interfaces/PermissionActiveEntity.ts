import { PermissionBaseEntity } from "./PermissionBaseEntity"

export type PermissionActiveEntity = PermissionBaseEntity & {
  contentType: {
    appLabel: string
    model: string
    appLabeledName: string
    name: string
  }
}
