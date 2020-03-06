/**
 * Created by demiladebamgbose on 21/09/2017.
 */

import pushNotifications from '../controller/pushNotification';
const notification = new pushNotifications();

export default function pushNotification(app) {
    app.route('/api/v1/push-token').post(notification.create);
}