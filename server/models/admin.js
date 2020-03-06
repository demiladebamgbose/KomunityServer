import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

function admin() {

    const AdminSchema = mongoose.Schema({
        name: {
            firstName:{type: String, required: true},
            lastName: {type: String, required: true}
        },
        password: {type: String, required: true},
        email:{type: String, unique: true, required: true},
        image: {type: String},
    });

    AdminSchema.pre('save', function (next) {
        this.password = bcrypt.hashSync(this.password);
        next();
    });

    const admin = mongoose.model('Admin', AdminSchema);

    return {
        model: admin
    }
}

export default admin();
