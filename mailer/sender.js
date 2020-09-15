const dotenv = require("dotenv")
dotenv.config({path: '../.env'})
const contactmysqlConnect= require('../mysql/mysql')
const db = contactmysqlConnect.mysqlconnect()

//sendgrid mailer
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//mailgun mailer
const mailgun = require("mailgun-js");
const DOMAIN =  process.env.MAILGUN_DOMAIN
const APIKEY = process.env.MAILGUN_APIKEY

const mg = mailgun({apiKey: APIKEY, domain: DOMAIN});
module.exports = {
    sendGrid: function (ToEmail, ToCc, ToBcc, subject, message, callback) {
      const msg = {
        to: ToEmail,
        cc: ToCc,
        bcc: ToBcc,
        from: 'lyndon@shoephoric.com',
        subject: subject,
        text: message,
      };


      sgMail.send(msg, (err, result) =>{
              if (err){
              console.log(result)
              return callback("error")
              }
              else{
                return callback("Message Sent via Send Grid")
              }
            });
      
    },
    mailGun: function (ToEmail, ToCc, ToBcc, subject, message,callback) {
        const data = {
            from: 'Me User <me@sandbox6b81aaddd1ae489a8e5c115e8025129f.mailgun.org>',
            to: ToEmail,
            subject: 'Hello',
            text: 'Testing some Mailgun awesomness!'
        };
        mg.messages().send(data, function (error, body) {
            if(error){
                
                return callback("Failed via Mail Gun")
            }else{
                
                return callback("Sent via Mail Gun")
            }
        });
    },
    mailSentItems: function(ToEmail, ToCc, ToBcc, subject, message,status){
        db.query('INSERT INTO sentMessages SET ?',{toEmail: ToEmail, toCc: ToCc, toBcc: ToBcc, subject: subject, message: message, status: status})
    }
  };