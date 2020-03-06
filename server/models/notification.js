/**
 * Created by demiladebamgbose on 26/09/2017.
 */


import mongoose from 'mongoose';

function notification() {

    const NotificationSchema = mongoose.Schema({
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        activity: {type: String, required: true},
        resource :{type: String},
        owner:{type: String, required: true}
    },{
        timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
    });

    const notification = mongoose.model('Notification', NotificationSchema);

    return {
        model: notification
    }
}

export default notification();