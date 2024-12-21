export default class AppError extends Error {
    public statusCode: number;
    public success: boolean;
    public error: { details: string };
    public stack?: string;
     
  
    constructor(statusCode: number, message: string, details: string, stack: string = '') {
      super(message);
  
      this.statusCode = statusCode || 401;  
      this.success = false;  
      this.error = {
        details: details,
      };
  
      if (stack) {
        this.stack = stack;
      } else {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  
     
    toJSON() {
      return {
        success: this.success,
        message: this.message,
        statusCode: this.statusCode,
        error: this.error,
        stack: this.stack,  
      };
    }
  }
  