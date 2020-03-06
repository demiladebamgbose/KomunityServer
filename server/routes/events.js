/**
 * Created by demiladebamgbose on 08/10/2017.
 */
import Events from '../controller/events';

export default function eventRoute(app) {
    const events = new Events();

    app.route('/api/v1/events').get(events.getEvents);

    app.route('/api/v1/sponsored').get(events.getSponsored);
}