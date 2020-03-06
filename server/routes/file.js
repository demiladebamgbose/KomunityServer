/**
 * Created by demiladebamgbose on 27/07/2017.
 */
import File from '../controller/file';

export default function fileRoute(app) {
    const file = new File();

    app.route('/api/v1/upload').post(file.create);

    app.route('/api/v1/upload/user/:id').get(file.getUserFile);

    app.route('/api/v1/upload').get(file.getRecentFiles);

    app.route('/api/v1/like/:id').put(file.like);

    app.route('/api/v1/like/:id').delete(file.unlike);

    app.route('/api/v1/likes').get(file.getFileLikes);

    app.route('/api/v1/:id/delete').delete(file.deleteFile);
}
