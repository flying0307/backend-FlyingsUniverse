import express from 'express';
import createError from 'http-errors';
const RequestLogin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (!res.locals.user) {

    next(
      createError.Unauthorized('Authentication is required for this route.'),
    );
    return;
  }

  next();
};

export default RequestLogin;
