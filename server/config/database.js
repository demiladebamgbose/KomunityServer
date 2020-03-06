
import mongoose from 'mongoose';

const options = {
    server:{reconnectTries: 5, pool: 5}
};

export default function connectDatabase() {

    const uri = process.env.MONGODB_URI

    mongoose.connect(uri, options);

    mongoose.connection.on('connected', ()=> {
        console.log('Mongo db connected');
    });


    mongoose.connection.on('error', ()=> {
        console.log('Mongo db error');
    });


    mongoose.connection.on('disconnected', ()=> {
        console.log('Mongo db disconnected');
    });

    process.on('SIGINT', function() {
        console.log('Do something useful here.');
        mongoose.connection.close(()=> {
            process.exit(0);
        });

    });

    return {
        db: mongoose
    }

}