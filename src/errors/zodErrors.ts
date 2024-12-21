import { ZodError, ZodIssue } from 'zod'
import { TGenericErrorResponse } from '../interface/error'

export const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorDetails = err.issues.map((issue: ZodIssue) => {
    return {
      details: issue?.message,
    }
  })

  const statusCode = 400
  const message = 'Zod validation error'

  return {
    statusCode,
    message,
    error: {
      details:
        errorDetails.length > 0
          ? errorDetails.map((err) => err.details).join(', ')
          : '',
    },
  }
}
