import express from 'express'
import { BlogController } from './blog.controller'
import validateRequest from '../../middleware/validateRequest'
import { BlogValidation } from './blog.validation'
import verifyToken from '../../middleware/verifyToken'
import { USER_ROLE } from '../User/user.constant'

const router = express.Router()

router.post(
  '/',
  verifyToken(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(BlogValidation.createBlogValidation),
  BlogController.createBlog
)

router.get('/', BlogController.getAllBlogs)

// router.get('/:id', BlogController.getSingleBlog)

router.patch('/:id', validateRequest(BlogValidation.updateBlogValidation), verifyToken(USER_ROLE.user) , BlogController.updateBlog)

router.delete('/:id', verifyToken(USER_ROLE.admin, USER_ROLE.user), BlogController.deleteBlog)

export const blogRoutes = router
