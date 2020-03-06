/**
 * Created by demiladebamgbose on 12/09/2017.
 */
import emailTemplate from './emailTemplate';
import resetTemplate from './resetPassword';


var helper = require('sendgrid').mail;
var from_email = new helper.Email('lade.bamgbose@gmail.com');

class Email {

    sendEmail = (email) => {
        console.log('The email is', email);
        var to_email = new helper.Email(email);

        var subject = 'Welcome to Kommunity';
        var content = new helper.Content('text/html', emailTemplate(email));
        var mail = new helper.Mail(from_email, subject, to_email, content);

        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        });

        sg.API(request, function(error, response) {
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
        });

    };

    sendResetEmail = (email) => {
        console.log('The email is', email);
        var to_email = new helper.Email(email);

        var subject = 'Welcome to Kommunity';
        var content = new helper.Content('text/html', resetTemplate(email));
        var mail = new helper.Mail(from_email, subject, to_email, content);

        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        });

        sg.API(request, function(error, response) {
            console.log(response.statusCode);
            console.log(response.body);
            console.log(response.headers);
        });
    }
}

export default new Email();






/*
 let transporter = nodemailer.createTransport({
 service: 'Gmail',
 auth: {
 user: 'lade.bamgbose@gmail.com', // generated ethereal user
 pass: '123@abc@'  // generated ethereal password
 }
 });

 // setup email data with unicode symbols
 let mailOptions = {
 from: 'Authenticase', // sender address
 to: email, // list of receivers
 subject: 'Welcome to Authenticase', // Subject line
 text: '', // plain text body
 html: emailTemplate() // html body
 };

 // send mail with defined transport object
 transporter.sendMail(mailOptions, (error, info) => {
 if (error) {
 return console.log(error);
 }
 console.log('Message sent: %s', info.messageId);
 // Preview only available when sending through an Ethereal account
 console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

 // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
 // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
 });
 */