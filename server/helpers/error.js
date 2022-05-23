export class AppError extends Error {
  constructor(status, message) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.status = status;
    this.message = message;
    this.name = 'AppError';
  }
}

export function abort(status, message) {
  throw new AppError(status, message);
}

export function handleError(fuc) {
  return async (req, res, next) => {
    try {
      await fuc(req, res, next);
    } catch (err) {
      if (!err.status) {
        err.status = 500;
      }
      res.status(err.status).send({
        message: err.message,
      });
    }
  };
}
