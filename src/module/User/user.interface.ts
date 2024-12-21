import { USER_ROLE } from "./user.constant"

export type IUser = {
  name: string
  email: string
  password: string
  role: 'admin' | 'user'
  isBlocked: boolean
}

export type TUserRole = keyof typeof USER_ROLE;