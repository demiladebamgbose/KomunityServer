
import Admin from '../controller/admin';

export default function adminRoute(app) {
    const admin = new Admin();

    app.route('/api/v1/admin').post(admin.create);

    app.route('/api/v1/admin/login').post(admin.login);

    app.route('/api/v1/admin').get(admin.allAdmin);
}
