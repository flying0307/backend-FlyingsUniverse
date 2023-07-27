import express from 'express';
import axios from 'axios';

// JWT validation middleware
const JwtValidation = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  const accessToken = req.headers.authorization?.split(' ')[1]; // Get the token from the Bearer string

  if (accessToken) {
    const userInfo = await axios.get(`https://${process.env.AUTH_HOST_NAME}/userinfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    //console.log(userInfo);
    if (userInfo) {
      res.locals.user = userInfo.data;
      //console.log('Update Oidc');
    }
  } else {
    res.locals.user = req.oidc.user;
  }
  next();
};

export default JwtValidation;
