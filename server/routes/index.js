/**
 * Created by demiladebamgbose on 23/07/2017.
 */

import userRoutes from './user';
import fileRoutes from './file';
import messageRoutes from './message';
import notificationRoute from './pushNotification';
import eventRoutes from './events';

export default function routes(app) {
    userRoutes(app);
    fileRoutes(app);
    messageRoutes(app);
    notificationRoute(app);
    eventRoutes(app);
}