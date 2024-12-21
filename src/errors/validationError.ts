import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

export const handleValidationError = (err: mongoose.Error.ValidationError): TGenericErrorResponse => {
  // Collect all validation errors
  const errorDetails = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        details: val?.message || 'Additional error details, if applicable',
      };
    }
  );

  const statusCode = 400; // Bad Request for validation errors
  const message = 'Validation error';

  // Return the error response
  return {
    statusCode,
    message,
    error: {
      details: errorDetails.length > 0 ? errorDetails : 'No specific error details provided',
    },
  };
};
