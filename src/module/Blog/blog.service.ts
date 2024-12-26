import AppError from '../../errors/AppError'
import QueryFilter from '../../queryFilter/queryFilter'
import { User } from '../User/user.model'
import { searchableFields } from './blog.constant'
import { IBlog } from './blog.interface'
import { Blog } from './blog.model'

const createBlog = async (payload: IBlog): Promise<IBlog> => {
  const authorId = payload?.author
  // console.log(authorId);
  
  const isAuthorExist = await User.findById(authorId)
  if (!isAuthorExist) {
    throw new AppError(404, 'Author not found','Author does not exist in our records')
  }
  const result = await Blog.create(payload)
  const populatedBlog = await Blog.findById(result._id).populate(
    'author',
    '-password'
  )
  return populatedBlog as IBlog
}

const getAllBlogs = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryFilter(Blog.find().populate('author'), query)
    .search(searchableFields)
    .filter()
    .sortBy()

  const result = await blogQuery.modelQuery
  return result
}
 

const updateBlog = async (id: string, payload: Partial<IBlog>) => {
  const result = await Blog.findByIdAndUpdate(id, payload, { new: true })
  return result
}

const deleteBlog = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id)
  return result
}

export const BlogService = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
}
