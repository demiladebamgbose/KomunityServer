
import mongoose from 'mongoose';


function message() {

    const messageSchema = mongoose.Schema({
            conversationId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            body: {
                type: Array,
                required: true
            },
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        },
        {
            timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
        });

    const message = mongoose.model('Message', messageSchema);

    return {
        model: message
    }
}

export default message();

