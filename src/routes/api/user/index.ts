import { Router, Request, Response, NextFunction } from 'express';
const router = Router();
import RepoUser from '@repo/repo-user';
import RequestLogin from '@mw/request-login';

router.get('/list', RequestLogin, async (req: Request, res: Response, next: NextFunction) => {
  // #swagger.description = 'Get all users information'
  /*	#swagger.responses[200] = {
          in: 'body',
          description: 'All users information',
          schema: { $ref: "#/definitions/AllUser" }
  } */
  /* #swagger.security = [{
          "openId": []
  }] */
  try {
    res.send(await RepoUser.getAllUser());
  } catch (error) {
    console.error(error);
  }
  res.end();
});

router.get('/stat', RequestLogin, async (req: Request, res: Response, next: NextFunction) => {
  // #swagger.description = 'Get users statistics'
  /*	#swagger.responses[200] = {
          in: 'body',
          description: 'users statistics',
          schema: { $ref: "#/definitions/Stat" }
  } */
  /* #swagger.security = [{
          "openId": []
  }] */
  try {
    const totalUserCount = await RepoUser.getStatTotal();
    const avgToday = await RepoUser.getStateAverage(1);
    const avgLast7Days = await RepoUser.getStateAverage(7);
    const data = {
      total_user: totalUserCount ?? 0,
      today_active_user: avgToday ?? 0,
      avg_last_7_active_user: avgLast7Days ?? 0,
    };
    res.send(data);
  } catch (error) {
    console.error(error);
    next(error);
  }
  res.end();
});

router.get('/me', RequestLogin, async (req: Request, res: Response, next: NextFunction) => {
  // #swagger.description = 'Get current user information'
  /*	#swagger.responses[200] = {
          in: 'body',
          description: 'Current user information',
          schema: { $ref: "#/definitions/AboutMe" }
  } */
  /* #swagger.security = [{
          "openId": []
  }] */
  try {
    const user = await RepoUser.getUser(res.locals.user.sub);
    res.send(user);
  } catch (error) {
    console.error(error);
    next(error);
  }
  res.end();
},
);

router.post('/info', RequestLogin, async (req: Request, res: Response, next: NextFunction) => {
  // #swagger.description = 'Update user's name'
  /*	#swagger.requestBody = {
          description: 'The new name',
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/UpdateName" },
            }  
          }
        }
  } */
  /*	#swagger.responses[200] = {
          in: 'body',
          description: 'Current user information',
          schema: { $ref: "#/definitions/AboutMe" }
  } */

  /* #swagger.security = [{
          "openId": []
  }] */
  try {
    const data = req.body;
    if (data.name.length <= 64) {
      const user = await RepoUser.updateInfo(res.locals.user.sub, data.name);
      res.send(user);
    } else {
      res.send(null);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
  res.end();
},
);

router.post('/password', RequestLogin, async (req: Request, res: Response, next: NextFunction) => {
  // #swagger.description = 'Change the password of an authenticated user.'
  /*	#swagger.requestBody = {
          description: 'User password information.',
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/ChangePwd" },
            }  
          }
        }
  } */
  /*	#swagger.responses[200] = {
          in: 'body',
          description: 'Current user information',
          schema: { $ref: "#/definitions/ResponseChangePwd" }
  } */
  /* #swagger.security = [{
          "openId": []
  }] */
  try {
    const data = req.body;
    res.send(await RepoUser.updatePassword(res.locals.user.sub, res.locals.user.email, data.old, data.new));
  } catch (error) {
    console.error(error);
    next(error); // 傳遞錯誤給下一個處理器
  }
  res.end();
},
);

export default router;
