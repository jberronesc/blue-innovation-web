export type ModuleBaseEntity = {
  id: number
  name: string
  url: string
  urlMatch: string
  description: string
  icon: string
  isActive: boolean
  menu: {
    id: number
    name: string
    icon: string
  }
  permissions: {
    id: number
    name: string
    codename: string
  }[]
}
