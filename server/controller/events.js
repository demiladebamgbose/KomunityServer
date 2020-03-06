
import eventSchema from '../models/events';
import sponsoredSchema from '../models/sponsored';

class Event {

    getEvents = (req, res) => {
        eventSchema.find({}, (err, files) => {
            if(err){

            }
            res.status(200).json({'file': files});
        })
    };

    getSponsored = (req, res) => {

        sponsoredSchema.find({}, (err, sponsored) => {
            if(err){
                console.log('err', err);
            }
            console.log(sponsored, 'Out here as sponsored');
            res.status(200).json({'sponsored': sponsored});
        })
    }
}

export default Event;