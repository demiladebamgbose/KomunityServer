/**
 * Created by demiladebamgbose on 27/07/2017.
 */
import mongoose from 'mongoose';

function file() {

    const FileSchema = mongoose.Schema({
        owner: {type: String, ref: 'User'},
        status: {type: String, required: true},
        content: {
            bytes:  {type: Number},
            created_at: {type: String},
            etag: {type: String},
            format: {type: String},
            height : {type: Number},
            original_filename : {type: String},
            public_id : {type: String},
            resource_type :{type: String},
            secure_url :{type: String},
            signature: {type: String},
            tags:{type: Array},
            type: {type: String},
            url:{type: String},
            version: {type: Number},
            width:{type: Number}
        },
        caption: {type: String},
        tags: {type: Array},
        hashtags: {type: Array},
        category: {type: Object},
        timestamp: { type: Date, default: Date.now },
        likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
    });

    const file = mongoose.model('File', FileSchema);

    return {
        model: file
    }

}

export default file();