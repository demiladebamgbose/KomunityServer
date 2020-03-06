/**
 * Created by demiladbamgbose on 06/09/2017.
 */


import Pusher from'pusher';
import messageModel from '../models/message';
import conversationModel from '../models/conversations';
import Notification from './pushNotification';
import userModel from '../models/user';

let pusher = {};
let parent = {};

const notification = new Notification();

class Message {



    constructor(){
        parent = this;
        pusher = new Pusher({
            appId: '391042',
            key: '1dbaf5cd35a87b7793b5',
            secret: 'fe29da3f2bcfe8f9aa22',
            cluster: 'eu',
            encrypted: true
        });
    }


    sendUserNotification = (userId, message, type) => {
        const userSchema = userModel.model;

        userSchema.findOne({_id: userId},
             (err, data)=> {
                if(err) {

                }
                let token = data.token;
                if(token) {
                    notification.sendNotification([token], message, 'message')
                }
        })
    };

    sendMessage =(req, res)=> {

        let senderId = req.body.recipient;
        let message = req.body.composedMessage;
        let userName = req.body.user.username;
        let userId = req.body.user._id;

        pusher.trigger(senderId, 'my-event', {
            "message": {username: userName, userId: userId, text: message}
        });

        if(!req.body.recipient) {
            res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
           // return next();
        }

        if(!req.body.composedMessage) {
            res.status(422).send({ error: 'Please enter a message.' });
          //  return next();
        }

        const Conversation = conversationModel.model;

        const conversation = new Conversation({
            participants: [req.body.user._id, req.body.recipient]
        });

        conversation.save(function(err, newConversation) {
            if (err) {
                res.send({ error: err });
                // return next(err);
            }

            const Message = messageModel.model;

            const message = new Message({
                conversationId: newConversation._id,
                body: req.body.composedMessage,
                author: req.body.user._id
            });

            message.save(function(err, newMessage) {
                if (err) {
                    res.send({ error: err });
                   // return next(err);
                }

              parent.sendUserNotification(senderId, req.body.composedMessage[0].text, 'message');

                res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
                // return next();
            });
        });

    };

    sendReply = (req, res) => {
        const Message = messageModel.model;
        let senderId = req.body.recipient;
        let message = req.body.composedMessage;
        let userName = req.body.user.username;
        let userId = req.body.user._id;

        const reply = new Message({
            conversationId: req.body.conversationId,
            body: req.body.composedMessage,
            author: req.body.user._id
        });

        reply.save(function(err, sentReply) {
            if (err) {
                res.send({ error: err });
              //  return next(err);
            }

            pusher.trigger(senderId, 'my-event', {
                "message": {username: userName, userId: userId, text: message}
            });

            parent.sendUserNotification(senderId, req.body.composedMessage[0].text, 'message');

            res.status(200).json({ message: 'Reply successfully sent!' });
            // return(next);
        });
    };

    getConversationList = (req, res) => {
        const Conversation = conversationModel.model;
        let userId = req.params.id;

        Conversation.find({participants: userId})
            .populate('participants')
            .exec((err, data) => {
                if(err){
                    console.log(err);
                }
                res.status(200).json({'conversationList': data});
            });
    };

    retrieveMessages = (req, res) => {
        const Conversation = conversationModel.model;
        let userId = req.params.id;

        Conversation.find({ participants: userId })
            .select('_id')
            .exec(function(err, conversations) {
                if (err) {
                    res.send({ error: err });
                    //return next(err);
                }

                // Set up empty array to hold conversations + most recent message
                let fullConversations = [];
                const Message = messageModel.model;


                if(conversations.length === 0) {
                    res.status(200).json({conversations: fullConversations});
                    return;
                }

                conversations.forEach(function(conversation) {

                    Message.find({ 'conversationId': conversation._id })
                        .sort('-createdAt')
                        .limit(1)
                        .populate({
                            path: "author",
                            select: "name.firstName name.lastName"
                        })
                        .exec(function(err, message) {
                            if (err) {
                                console.log('error is', err)
                                res.send({ error: err });
                               // return next(err);
                            }
                            fullConversations.push(message);
                            if(fullConversations.length === conversations.length) {
                                return res.status(200).json({ conversations: fullConversations });
                            }
                        });
                });
            });

    };

    //.sort('-createdAt')
    retrieveConversation = (req, res) => {

        const Message = messageModel.model;
        Message.find({ conversationId: req.params.conversationId })
            .select('createdAt body author')
            .populate({
                path: 'author',
                select: 'name.firstName name.lastName'
            })
            .exec(function(err, messages) {
                if (err) {
                    res.send({ error: err });
                   // return next(err);
                }
                res.status(200).json({ conversation: messages });
            });
    };

    deleteConversation = (req, res) => {

        const Conversation = conversationModel.model;

        Conversation.findOneAndRemove({
            $and : [
                { '_id': req.body.conversationId }, { 'participants': req.body._id }
            ]}, function(err) {
            if (err) {
                res.send({ error: err });
                // return next(err);
            }

            res.status(200).json({ message: 'Conversation removed!' });
            // return next();
        });
    };

    updateMessage = (req, res) => {

        const Conversation = conversationModel.model;

        Conversation.find({
            $and : [
                { '_id': req.body.messageId }, { 'author': req.user._id }
            ]}, function(err, message) {
            if (err) {
                res.send({ error: err});
               // return next(err);
            }

            message.body = req.body.composedMessage;

            message.save(function (err, updatedMessage) {
                if (err) {
                    res.send({ error: err });
                 //   return next(err);
                }

                res.status(200).json({ message: 'Message updated!' });
               // return next();
            });
        });
    };

    updateMessageToDelivered = (req, res) => {

    };

    updateMessaeToRead = (req, res) => {

    };
}

export default Message;