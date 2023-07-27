import { HttpStatusCode } from 'axios';
import { Router, Request, Response, NextFunction } from 'express';
import RepoUser from '@repo/repo-user';
import RepoAuth from '@repo/repo-auth';
import UtAuth from '@utils/ut-auth';
import RequestLogin from '@mw/request-login';

const router = Router();

router.get('/', RequestLogin, async (req: Request, res: Response) => {
  // #swagger.description = 'Get current user infotmation from session'
  /*	#swagger.responses[200] = {
          in: 'body',
          description: 'Current user information',
          required: true,
          schema: { $ref: "#/definitions/CurrentAuth" }
  } */
  /* #swagger.security = [{
          "openId": []
  }] */
  const user = await RepoUser.getUser(res.locals.user.sub);
  if (user) {
    res.send({
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      email_verified: user.email_verified,
      type: UtAuth.getTypeFromSub(user.user_id),
    });
  } else {
    res.status(HttpStatusCode.Unauthorized);
  }
  res.end();
});

router.get('/verification-email', RequestLogin, async (req: Request, res: Response) => {
  // #swagger.description = 'Send an email to the specified user that asks them to click a link to verify their email address'
  /*	#swagger.responses[200] = {
          in: 'body',
          description: 'Send email success or faith.',
          required: true,
          schema: { accept: true }
  } */

  /* #swagger.security = [{
          "openId": []
  }] */

  try {
    const accept = await RepoAuth.verifyEmail(res.locals.user.sub);
    res.send({
      accept: accept,
    });
  } catch (error) {
    console.error(error);
    res.send({
      accept: false,
      error: error,
    });
  }
  res.end();
},
);

router.post('/user', async (req, res) => {
  // #swagger.description = 'Only called from auth0 HOOK when new user registed.'
  /*	#swagger.requestBody = {
          description: 'New user information.',
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/AddUserHook" },
            }  
          }
        }
  } */
  /* #swagger.security = [{
          "openId": []
  }] */
  const data = req.body;
  const user = data.user;
  const hook = data.hook;
  console.log('post User');
  console.log(data);
  const pwd = 'vkIA%87$j5Jw';
  if (hook === pwd) {
    const result = await RepoUser.createUser(user.email, user.name ? user.name : user.email, user.password);
    res.send({
      success: result != null ? true : false,
    });
  } else {
    res.status(HttpStatusCode.Unauthorized);
    res.send({
      success: false,
    });
  }
  res.end();
});

export default router;
