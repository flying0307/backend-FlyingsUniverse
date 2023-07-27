import apiRouter from '@api/index';
import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '@/swagger_output.json';

const router = Router();
// for setup swagger
router.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
router.use('/api', apiRouter);

export default router;
