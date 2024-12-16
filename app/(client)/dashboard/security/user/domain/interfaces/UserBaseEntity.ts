export type UserBaseEntity = {
  id: number
  password: string
  lastLogin: Date
  username: string
  firstName: string
  lastName: string
  dni: string
  email: string
  isSuperuser: boolean
  isActive: boolean
  dateJoined: Date
  createAt: Date
  updateAt: Date
  groups: [
    {
      id: number
      name: string
    }
  ]
  icon: string
}
