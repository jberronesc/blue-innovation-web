export type AuthEntity = {
  accessToken: string
  user: {
    id: number
    name: string
    email: string
    image: string
  }
  group: {
    id: number
    name: string
  }
  menus: {
    id: number
    name: string
    icon: string
    modules: {
      id: number
      name: string
      url: string
      urlMatch: string
      menu: {
        id: number
        name: string
        icon: string
      }
      description: string
      icon: string
      isActive: boolean
    }[]
  }[]
  exercise: {
    id: number
    year: number
    isClose: boolean
    inUse: boolean
    isNext: boolean
  }
  groups: {
    id: number
    name: string
  }[]
  generalLedger: {
    id: number
    dateOpen: Date
    dateClose: Date
    isClosed: boolean
    dateIsClosed: Date
    month: string
  }
  generalLedgers: {
    id: number
    dateOpen: Date
    dateClose: Date
    isClosed: boolean
    dateIsClosed: Date
    month: string
  }[]
  permissions: {
    [x: string]: string
  }
}
