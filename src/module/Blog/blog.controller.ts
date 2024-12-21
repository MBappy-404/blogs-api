import { BlogService } from './blog.service'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'

const createBlog = catchAsync(async (req, res) => {
  const authorId = req?.user?.id
  const blogs = { ...req.body, author: authorId }

  const result = await BlogService.createBlog(blogs)

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: 'Blog  created successfully',
    data: result,
  })
})

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogService.getAllBlogs(req.query)
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Blogs fetched successfully',
    data: result,
  })
})

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await BlogService.updateBlog(id, req.body)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Blog updated successfully',
    data: result,
  })
})

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params
  await BlogService.deleteBlog(id)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Blog deleted successfully',
  })
})

export const BlogController = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
}
