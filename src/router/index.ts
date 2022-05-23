import {Express} from 'express';
import staticRouter from '@router/static';
import uiRouter from '@router/ui';
import authRouter from '@router/auth';
import dashboardRouter from '@router/dashboard';

import {validateAuth} from '@middleware/auth/checkAuth';

export const router  = (server: Express) => {
    server.use("/", staticRouter);
    server.use('/ui/', uiRouter);
    server.use('/auth/', authRouter);
    server.use('/dashboard', validateAuth, dashboardRouter)
    // server.use('/dashboard', useAuth, dashboard);
    // server.use('/auth', auth);
    // server.use('/account', account);
}