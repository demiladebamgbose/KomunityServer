/**
 * Created by demiladebamgbose on 21/09/2017.
 */
import Expo from 'expo-server-sdk';
import userModel from '../models/user';

class Notification  {

    create = (req, res) => {
        const userSchema = userModel.model;
        const id = req.body._id;
        let token = req.body.token.value;

        userSchema.findByIdAndUpdate({_id: id}, {$set:{token: token}},
            { new: true }, (err, userData) => {
                if (err) {
                    res.status(200).json({'message': {'error': err}});
                    return;
                }

                    res.status(200).json( {'message': {'data': userData}});

            });


    };

    sendNotification = (somePushTokens, message, type) => {
        let expo = new Expo();

        // Create the messages that you want to send to clents
        let messages = [];
        for (let pushToken of somePushTokens) {
            // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

            // Check that all your push tokens appear to be valid Expo push tokens
            if (!Expo.isExpoPushToken(pushToken)) {
                console.error(`Push token ${pushToken} is not a valid Expo push token`);
                continue;
            }

            // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
            messages.push({
                to: pushToken,
                sound: 'default',
                body: 'Messages from kommunity',
                data: { message: message, title: `Kommunity ${type}` },
            })
        }

        // The Expo push notification service accepts batches of notifications so
        // that you don't need to send 1000 requests to send 1000 notifications. We
        // recommend you batch your notifications to reduce the number of requests
        // and to compress them (notifications with similar content will get
        // compressed).
        let chunks = expo.chunkPushNotifications(messages);

        (async () => {
            // Send the chunks to the Expo push notification service. There are
            // different strategies you could use. A simple one is to send one chunk at a
            // time, which nicely spreads the load out over time:
            for (let chunk of chunks) {
                try {
                    let receipts = await expo.sendPushNotificationsAsync(chunk);
                    console.log(receipts);
                } catch (error) {
                    console.error(error);
                }
            }
        })();

    }
}

export default Notification;