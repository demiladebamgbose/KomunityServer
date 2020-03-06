/**
 * Created by demiladebamgbose on 14/09/2017.
 */

import mongoose from 'mongoose';

function conversation() {

    const ConversationSchema = mongoose.Schema({
        participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    });

    const conversation = mongoose.model('Conversation', ConversationSchema);

    return {
        model: conversation
    }
}

export default conversation();
