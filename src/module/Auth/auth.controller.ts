import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthService } from './auth.service'

const register = catchAsync(async (req, res) => {
  const result = await AuthService.register(req.body)

  sendResponse(res, {
    success: true,
    message: 'User registered  successfully',
    statusCode: 201,
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
    },
  })
})

const login = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body)

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Login successful',
    data: result,
  })
})

export const AuthController = {
  register,
  login,
}
