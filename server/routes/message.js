/**
 * Created by demiladebamgbose on 06/09/2017.
 */

import Messages from '../controller/message';
const messages = new Messages();

export default function message(app) {
    app.route('/api/v1/message').post(messages.sendMessage);
    app.route('/api/v1/message/reply').post(messages.sendReply);
    app.route('/api/v1/message/:id').get(messages.retrieveMessages);
    app.route('/api/v1/message/conversation/users/:id').get(messages.getConversationList);
    app.route('/api/v1/message/conversation/:conversationId').get(messages.retrieveConversation);
    app.route('/api/v1/message/:id').put(messages.updateMessageToDelivered);
    app.route('/api/v1/message/read/:id').put(messages.updateMessaeToRead);
}