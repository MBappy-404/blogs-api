import { IUser } from './user.interface'
import { User } from './user.model'

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find()
  return result
}

export const UserService = {
  getAllUsers,
}
