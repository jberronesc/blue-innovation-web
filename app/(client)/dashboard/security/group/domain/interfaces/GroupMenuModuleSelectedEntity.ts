export type GroupMenuModuleSelectedEntity = {
  uuid: string
  menu: {
    id: number
    name: string
  }
  isSelected: boolean
  modulesWrapper: {
    isSelected: boolean
    module: {
      id: number
      name: string
      permissions: ({ isSelected: boolean } & {
        id: number
        name: string
        codename: string
      })[]
      permissionsCodenames: string[]
      url: string
      menu: {
        id: number
        name: string
      }
    }
    menu: {
      id: number
      name: string
    }
  }[]
}
