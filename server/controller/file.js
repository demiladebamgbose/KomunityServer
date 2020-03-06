

import fileModel from '../models/file';
import Notification from './pushNotification';
import userModel from '../models/user';
import notificationModel from '../models/notification';

let parent = {};
const notification = new Notification();

class File {

    constructor() {
        parent = this;
    }

    create = (req, res) => {
        const FileSchema = fileModel.model(req.body);

        FileSchema.save((err, data ) => {
            if(err) {
                console.log('error');
                res.status(201).json({'message':  {'response': false}});
            }

            res.status(201).json({'message':  {'response': true}});

        });
    };

    getUserFile = (req, res) => {
        const FileSchema = fileModel.model;
        let userId = req.params.id;

       FileSchema.find({owner: userId},(err, data) => {
            if(err){
                res.status(200).json({'message':  {'error': err}});
            }

            res.status(200).json({'message':  {'data': data}});
        });
    };

    getRecentFiles = (req, res) => {
        const FileSchema = fileModel.model;

        FileSchema.find({},(err, data) => {
            if(err){
                res.status(200).json({'message':  {'error': err}});
            }

            res.status(200).json({'message':  {'data': data}});
        });
    };

    sendUserNotification = (userId, message, type) => {
        const userSchema = userModel.model;

        userSchema.findOne({_id: userId},
            (err, data)=> {
                if(err) {

                }
                let token = data.token;
                if(token) {
                    notification.sendNotification([token], message, 'notification')
                }
            })
    };

    like =( req, res) => {

        const FileSchema = fileModel.model;
        let user = req.body.user;
        let fileId = req.params.id;

        FileSchema.findByIdAndUpdate({ _id: fileId },
            { $pullAll: { likes: [user] }}, { new: true }, (err, data)=>{

                if(err){
                    res.status(200).json({'message':  {'error': err}});
                }else{
                    FileSchema.findByIdAndUpdate({ _id: fileId },
                        { $push: { likes: user }}, { new: true }, (err, data)=>{

                            if(err){
                                console.log('error', err);
                                res.status(200).json({'message':  {'error': err}});
                            }else{
                                this.sendUserNotification(data.owner, `${user.username} liked your post`, 'notification');

                                const notificationSchema = notificationModel
                                    .model(
                                        { owner: data.owner, user: user,
                                            activity: 'Liked', resource: fileId
                                        });

                                notificationSchema.save((err, data)=> {
                                    if(err){
                                        console.log(err)
                                    }
                                });

                                res.status(200).json({'message': {'data': 'success', 'file': fileId}});
                            }
                        });
                }
            });


    };

    unlike = (req, res) => {
        const FileSchema = fileModel.model;
        let user = req.body.user;
        let fileId = req.params.id;

        FileSchema.findByIdAndUpdate({ _id: fileId },
            { $pullAll: { likes: [user] }}, { new: true }, (err, data)=>{

                if(err){
                    res.status(200).json({'message':  {'error': err}});
                }else{
                    res.status(200).json({'message': {'data': 'success', 'sub': data}});
                }
            });
    };

    getFileLikes = (req, res) => {
        const FileSchema = fileModel.model;
        let fileId = req.query.id;

        FileSchema.findOne({_id: fileId}).populate('likes').
        exec((err, fileData)=> {
            if(err){
                res.status(200).json({'message':  {'error': err}});
            }

            res.status(200).json({'message': {'data': 'success', 'file': fileData}});
        })


    }

    deleteFile = (req, res) => {
        const FileSchema = fileModel.model;
        let fileId = req.params.fileId
        FileSchema.findByIdAndRemove(fileId, (err) => {
            if (err) {
                res.status(500).json({ message: 'An error occured' });
            } else {
                res.status(200).json({ message: 'File deleted' })
            }

        });
    }

}

export default File;
