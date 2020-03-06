/**
 * Created by demiladebamgbose on 23/07/2017.
 */

import User from '../controller/user';

export default function userRoute(app) {
    const user = new User();

    app.route('/api/v1/users').post(user.create);

    app.route('/api/v1/users/login').post(user.login);

    app.route('/api/v1/users').get(user.findAllUsers);

    app.route('/api/v1/users/:id').get(user.findUserSearch).put(user.editUser);

    app.route('/api/v1/users/:id/user').get(user.findUser);

    app.route('/api/v1/users/friend').post(user.addFriend);

    app.route('/api/v1/users/friend/:id').put(user.removeFriend);

    app.route('/api/v1/users/reset/:id').put(user.resetPassword);

}
