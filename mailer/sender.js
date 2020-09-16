const dotenv = require("dotenv")
dotenv.config({path: '../.env'})
const contactmysqlConnect= require('../mysql/mysql')
const db = contactmysqlConnect.mysqlconnect()

//sendgrid mailer
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//sgMail.setApiKey(process.env.SENDGRID_APIKEY);

//mailgun mailer
const mailgun = require("mailgun-js");
const DOMAIN =  process.env.MAILGUN_DOMAIN
const APIKEY = process.env.MAILGUN_APIKEY

const mg = mailgun({apiKey: APIKEY, domain: DOMAIN});
//we can replace from during production
module.exports = {
    sendGrid: function (ToEmail, ToCc, ToBcc, subject, message, callback) {
      const msg = {
        to: ToEmail,
        cc: ToCc,
        bcc: ToBcc,
        from: 'lyndon@geeksmnl.com',
        subject: subject,
        text: message,
      };


      sgMail.send(msg, (err, result) =>{
              if (err){
              console.log(err)
              return callback(err)
              }
              else{
                console.log(result)
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
                
                return callback(error)
            }else{
                
                return callback("Sent via Mail Gun")
            }
        });
    },
    mailSentItems: function(ToEmail, ToCc, ToBcc, subject, message,status){
        //convert array to string
        const to = ToEmail.toString()
        const cc = ToCc.toString()
        const bcc = ToBcc.toString()
        //insert to db
        db.query('INSERT INTO sentMessages SET ?',{toEmail: to, toCc: cc, toBcc: bcc, subject: subject, message: message, status: status})
    }
  };