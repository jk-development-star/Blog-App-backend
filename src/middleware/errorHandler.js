import isHttpError from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let errMessage = 'An unknown error occurred.';
  if (isHttpError(error)) {
    statusCode = error.status;
    errMessage = error.message;
  }
  res.status(statusCode).json({
    error: errMessage,
  });
};

export const validationError = (error) => {
  let validationErrorMessages = {};
  if (error.errors) {
    for (const field in error.errors) {
      validationErrorMessages[field] = {
        message: error.errors[field].message,
      };
    }
  }
  return validationErrorMessages;
};

export const emailConflictError = (error) => {
  let emailDuplicationErrorMessage = {};
  emailDuplicationErrorMessage['error'] = {
    message: 'Email already in use. Please use different one.',
  };
  return emailDuplicationErrorMessage;
};