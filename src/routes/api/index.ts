import express from 'express';
import authRouter from '@api/auth/index';
import userRouter from '@api/user/index';

const router = express.Router();

router.use('/auth', authRouter /* #swagger.tags = ['Auth'] */);
router.use('/user', userRouter /* #swagger.tags = ['User'] */);

export default router;

