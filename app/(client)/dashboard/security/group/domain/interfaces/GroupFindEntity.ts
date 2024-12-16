import { GroupBaseEntity } from "./GroupBaseEntity"

export type GroupFindEntity = GroupBaseEntity & {
  groupModulePermissions: {
    module: {
      id: number
      name: string
    }
    permissions: {
      id: number
      name: string
      label: string
    }[]
  }[]
}
