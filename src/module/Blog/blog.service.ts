import QueryFilter from '../../queryFilter/queryFilter'
import { User } from '../User/user.model'
import { searchableFields } from './blog.constant'
import { IBlog } from './blog.interface'
import { Blog } from './blog.model'

const createBlog = async (payload: IBlog): Promise<IBlog> => {
  const authorId = payload?.author
  const isAuthorExist = await User.findById(authorId)
  if (!isAuthorExist) {
    throw new Error('Author is Not Found')
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

const getSingleBlog = async (id: string): Promise<IBlog | null> => {
  const result = await Blog.findById(id).populate('author')
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
  getSingleBlog,
  updateBlog,
  deleteBlog,
}
