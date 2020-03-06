/**
 * Created by demiladebamgbose on 08/10/2017.
 */
import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
    name:{type: String}, comments:{type: String},
    user:{type: String}, link:{type: String}
});

export default mongoose.model('Events', eventSchema);