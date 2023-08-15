import apiRouter from '@api/index';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '@/swagger_output.json';
import { OpenidRequest, OpenidResponse } from 'express-openid-connect';

const router = Router();
// for setup swagger
router.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
router.use('/api', apiRouter);

router.get('/signup', (req: OpenidRequest, res: OpenidResponse) => {
  // Check if the user is already authenticated
  if (res.locals.user != null) {
    // User is already authenticated, so redirect them to the /home route
    res.redirect('/home');
  } else {
    // User is not authenticated, so direct them to the signup screen on Auth0
    res.oidc.login({
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  }
});


export default router;
