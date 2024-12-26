import AppError from '../../errors/AppError'
import { Blog } from '../Blog/blog.model'
import { User } from '../User/user.model'

const blockUserByAdmin = async (id: string) => {

    const user = await User.findById(id)

    if(!user){
        throw new AppError(404,'User not found','User does not exist in our records')
    }

    if(user?.isBlocked === true){
        throw new AppError(400,'User already blocked','This user is already blocked')
    }

  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: true },
    { new: true }
  )
  return result
}

const deleteBlogByAdmin = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id)
  return result
}

export const AdminService = {
  blockUserByAdmin,
  deleteBlogByAdmin,
}
