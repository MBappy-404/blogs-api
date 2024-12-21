export type TErrorSource = {
    path: string | number;
    message: string;
  }[];
  
  export type TGenericErrorResponse = {
    details?: string;
    statusCode: number;
    message: string;
    error: {
      details: unknown;
    };
  };
  