import { Blog } from '../Blog/blog.model'
import { User } from '../User/user.model'

const blockUserByAdmin = async (id: string) => {

    const user = await User.findById(id)

    if(!user){
        throw new Error('User not found')
    }

    if(user?.isBlocked === true){
        throw new Error('User is already blocked')
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
