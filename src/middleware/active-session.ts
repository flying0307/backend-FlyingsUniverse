import express from 'express';
import RepoDaily from '@repo/repo-daily';

const ActiveSession = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  if (res.locals.user) {
    await RepoDaily.activeSession(res.locals.user.sub);
  }
  next();
};

export default ActiveSession;
