/**
 * Created by demiladebamgbose on 23/07/2017.
 */

import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

function user() {

    const UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        name: {
            firstName:{type: String, required: true},
            lastName: {type: String, required: true}
        },
        password: {type: String, required: true},
        email:{type: String, unique: true, required: true},
        image: {type: String},
        followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        kin: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
        token: {type: String}
    });

    UserSchema.pre('save', function (next) {
        this.password = bcrypt.hashSync(this.password);
        next();
    });

    const user = mongoose.model('User', UserSchema);

    return {
        model: user
    }
}

export default user();
