/**
 * Created by demiladebamgbose on 23/07/2017.
 */


import bcrypt from 'bcrypt-nodejs';
import userModel from '../models/user';
import Notification from './pushNotification';
import notificationModel from '../models/notification';
import email from '../services/email';

const notification = new Notification();

class User {

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

    create = (req, res) => {
        let userSchema = userModel.model(req.body);

        if(req.body.fb){
            userSchema = userModel.model;
            userSchema.findOne({username: req.body.username}).populate('followers')
                .populate('kin').exec((err, userData)=> {

                if(err){
                    console.log('error');
                    return;
                }
                if(userData) {
                    res.status(200).json({'message':
                        {'response': 'user logged in', user: userData}
                    });
                    return;
                }else{
                    userSchema = userModel.model(req.body);
                    userSchema.save((err, data) => {
                        if (err) {
                            console.log('error', err);
                            return;
                        }
                        email.sendEmail(req.body.email);

                        res.status(200).json({'message':
                            {'response': 'user logged in', user: data}
                        })

                    });

                }
            })
        }else {

            userSchema.save((err, data) => {
                if (err) {
                    console.log('error');
                    return;
                }

                if(data) {
                    email.sendEmail(req.body.email);

                    res.status(200).json({
                        'message': {'response': 'user logged in', user: data}
                    })
                }

            });
        }
    };

    login = (req, res) => {

        const userSchema = userModel.model;
        userSchema.findOne({ username: req.body.username})
            .populate('followers')
            .populate('kin').exec((err, userData) => {
            if (err) {
                console.log(err);
                return console.error(err);
            }

            if(userData) {
                bcrypt.compare(req.body.password, userData.password, (err, data) => {
                    if(data) {
                        res.status(200).json({'message':{'response': 'user logged in', user: userData}
                        });
                    } else{
                        res.status(200).json({'message': {'response':'Invalid Username or password'}});
                    }
                });
            }
            else{
                res.status(200).json({'message': {'response':'Invalid Username or password'}});
            }
        })
    };

    findAllUsers = (req, res) => {
        const userSchema = userModel.model;

        userSchema.find({}).populate('followers').populate('kin')
            .exec((err, data) => {
                if(err) {
                    console.log(err);
                    return;
                }

                res.status(200).json({'data': data});
        })
    };

    findUser = (req, res) => {
        const userSchema = userModel.model;

        let userId = req.params.id;

        userSchema.findOne({_id: userId})
            .populate('followers')
            .populate('kin').exec((err, data)=> {
                if(err) {

                }
                res.status(200).json({'data': data});
            })
    };

    findUserSearch = (req, res) => {
        const userSchema = userModel.model;

        let userSearch = req.params.id;

        userSchema.find( { $or:[ {'name.lastName': new RegExp(userSearch, "gi")},
            {'username': new RegExp(userSearch, "gi")}, {'name.firstName': new RegExp(userSearch, "gi")}
          ]}).populate('followers')
            .populate('kin').exec((err, data) => {

            if(err) {
                console.log(err);
                return;
            }
            res.status(200).json({'data': data});

        })
    };

    addFriend = (req, res) => {
        const userSchema = userModel.model;
        const requestedFollow = req.body.follower;
        const follower = req.body.user;

        userSchema.findByIdAndUpdate({_id: requestedFollow._id}, {$pullAll: {kin: [follower]}},
            { new: true }, (err, userData) => {
                if (err) {
                    res.status(200).json({'message': {'error': err}});
                } else {
                    userSchema.findByIdAndUpdate({_id: requestedFollow._id}, {$push: {kin: follower}},
                        {new: true}, (err, userData) => {
                            if (err) {
                                res.status(200).json({'message': {'error': err}});
                            }

                            if (userData) {
                                const notificationSchema = notificationModel
                                    .model(
                                        {
                                            owner: req.body.user._id, user: follower._id,
                                            activity: 'Friend', resource: ''
                                        });

                                notificationSchema.save((err, data) => {
                                    if (err) {
                                        console.log(err)
                                    }
                                });

                                this.sendUserNotification(
                                    req.body.user._id, `${follower.username} has followed you`, 'notification'
                                );
                                userSchema.findByIdAndUpdate({_id: req.body.user._id}, {$pullAll: {followers: [requestedFollow]}},
                                    {new: true}, (err, data) => {
                                        if (err) {
                                            res.status(200).json({'message': {'error': err}});
                                        }
                                        if (data) {
                                            userSchema.findByIdAndUpdate({_id: req.body.user._id}, {$push: {followers: requestedFollow}},
                                                {new: true}, (err, data) => {
                                                    if (err) {
                                                        res.status(200).json({'message': {'error': err}});
                                                    }
                                                    if (data) {
                                                        res.status(200).json({'message': {'data': userData}});
                                                    }
                                                });
                                        }
                                    });

                            }
                        })
                }
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

    removeFriend = (req, res) => {
        const userSchema = userModel.model;
        const id = req.params.id;
        const follower = req.body.user;
        const requestedUnfollow = req.body.unfollow;

        userSchema.findByIdAndUpdate({_id: id}, { $pullAll: {kin: [follower]} },
            {new: true}, (err, userData)=> {

            if(err) {
                res.status(200).json({'message': {'error': err}});
            }
            else{
                userSchema.findByIdAndUpdate({_id: requestedUnfollow._id}, {$pullAll: {followers: [follower]}}, (err, data) =>{
                    if(err) {

                    }else{
                        res.status(200).json({'message': {'data': userData}});
                    }
                })
            }
            })
    };

    editUser= (req, res) => {
        const userSchema = userModel.model;
        userSchema.findByIdAndUpdate( req.params._id, { $set: req.body }, (err, user) => {
            if (err) {
               res.status(500).json({ message: 'An error occured' });
               return;
            }

            if (user) {
              res.status(200).json({ user: user });
              return;
            }

            res.status(404).json({ message: 'User not found' })
        });
    };

    resetPassword = (req, res) => {
        let emailUser = req.body.email;
        email.sendResetEmail(emailUser);
        res.status(200).json({message: 'Reset'});
    };

}

export default User;
