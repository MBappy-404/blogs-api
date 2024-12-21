import { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { handleZodError } from '../errors/zodErrors'
import { handleValidationError } from '../errors/validationError'
import AuthenticationError from '../errors/AppError'

const globalErrorHandler: ErrorRequestHandler = (err, req, res,) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Something went wrong'
  let errorDetails = err?.error?.details || 'An unexpected error occurred'

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode || statusCode
    message = simplifiedError?.message || message
    errorDetails = simplifiedError?.details || errorDetails
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode || statusCode
    message = simplifiedError?.message || message
    errorDetails = simplifiedError?.details || errorDetails
  } else if (err instanceof Error) {
    message = err?.message || message
    errorDetails = 'An unexpected error occurred'
  }  else if (err instanceof AuthenticationError) {
    statusCode = err?.statusCode 
    message = err?.message 
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    statusCode: statusCode,
    error: {
      details: err?.error?.details || errorDetails,
    },
    stack: err?.stack
  })
}

export default globalErrorHandler
