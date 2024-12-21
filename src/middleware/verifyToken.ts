import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import catchAsync from '../utils/catchAsync'
import { User } from '../module/User/user.model'
import { TUserRole } from '../module/User/user.interface'
import config from '../config'
import AppError from '../errors/AppError'

const verifyToken = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    try {
      if (!token) {
        next(new AppError(401, 'Unauthorized request', 'Token is missing'))
      }
      const decoded = jwt.verify(
        token as string,
        config.jwt_secret as string
      ) as JwtPayload

      const { role, email } = decoded


      if (requiredRoles && !requiredRoles.includes(role)) {
        next(
          new AppError(
            403,
            'Unauthorized request',
            'You are not authorized to access this resource'
          )
        )
      }

      // checking if the user is exist
      const user = await User.findOne({ email })

      if (!user) {
        next(
          new AppError(
            404,
            'User Not Found',
            'The user with the given credentials does not exist.'
          )
        )
      }

      // checking if the user is inactive
      const isUserBlocked = user?.isBlocked === true

      if (isUserBlocked) {
        next( new Error('This user is blocked ! !'))
      }

      req.user = decoded as JwtPayload
      next()
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (err.name === 'TokenExpiredError') {
          throw new AppError(401, 'Authentication failed', 'Token has expired')
        } else if (err.name === 'JsonWebTokenError') {
          throw new AppError(401, 'Unauthorized', 'Invalid token')
        }
      }
    }
  })
}

export default verifyToken
