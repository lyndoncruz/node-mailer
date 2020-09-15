const validator = require("email-validator")
const sgMail = require('@sendgrid/mail')
const mailer = require('../mailer/sender')


exports.mailchecker = (req,res) =>{
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const {ToEmail, ToCc, ToBcc, subject, message} = req.body
    const emailArr = ToEmail.split(",")
    const emailCc = ToCc.split(",")
    const emailBcc = ToBcc.split(",")
    
        //check email to recipients
        var notvalid = []
        var validEmail = []
        for(let val of emailArr) {
            let email = val.trim()
            if(!validator.validate(email))
            {
                notvalid.push(email)
            }else{
                validEmail.push(email)
            }
        }

        //check emailCc to recipients
        var notvalidCc = []
        var validEmailCc = []
        for(let val of emailCc) {
            let mailCc = val.trim()
            var notvalidCc = []
            if(!validator.validate(mailCc))
            {
                if(mailCc != ""){
                notvalidCc.push(mailCc)
                }
                
            }else{
                validEmailCc.push(mailCc)
            }
        }

        //check emailBcc to recipients
        var notvalidBcc = []
        var validEmailBcc = []
        for(let val of emailBcc) {
            let mailBcc = val.trim()
        var notvalidBcc = []
            if(!validator.validate(mailBcc))
            {
                if(mailBcc != ""){
                notvalidCc.push(mailBcc)
                }
                
            }else{
                validEmailCc.push(mailBcc)
            }
        }
        

    if (notvalid.length)
        {   return res.render('index',{
                ToEmail:ToEmail,
                ToCc:ToCc,
                ToBcc:ToBcc,
                subject:subject,
                message:message,
                alertmessage:err = 'Not valid emails : ' + notvalid.join(', ')
            })
        }

    else if (notvalidCc.length)
        {  
            return res.render('index',{
                ToEmail:ToEmail,
                ToCc:ToCc,
                ToBcc:ToBcc,
                subject:subject,
                message:message,
                CcDisplay:"style=display: block;",
                alertmessage:err = 'Not valid Cc emails : ' + notvalidCc.join(', ')
            })
        }

    else if (notvalidBcc.length)
        {   
            return res.render('index',{
                ToEmail:ToEmail,
                ToCc:ToCc,
                ToBcc:ToBcc,
                subject:subject,
                message:message,
                alertmessage:err = 'Not valid Bcc emails : ' + notvalidBcc.join(', ')
            })
        }
        
    else if(subject.length < 1){
        return res.render('index',{
            ToEmail:ToEmail,
            ToCc:ToCc,
            ToBcc:ToBcc,
            subject:subject,
            message:message,
            alertmessage:"Please Enter Subject"
        })
    }
    else if(message.length < 1){
        return res.render('index',{
            ToEmail:ToEmail,
            ToCc:ToCc,
            ToBcc:ToBcc,
            subject:subject,
            message:message,
            alertmessage:"Please Enter Message"
        })
    }
    else{
        //sending message using sendgrid. from is static while on development stage
        
        const msg = {
            to: validEmail,
            cc: emailCc,
            bcc: emailBcc,
            from: 'lyndon@shoephoric.com',
            subject: subject,
            text: message,
          };
          mailer.sendGrid(validEmail,emailCc,emailBcc,subject, message,(status)=>{
                if(status === "error"){
                    //send to another mail server
                    mailer.mailGun(validEmail,emailCc,emailBcc,subject, message, (msg)=>{
                        //save to db status sent
                        mailer.mailSentItems(validEmail,emailCc,emailBcc,subject, message,msg)
                        return res.render('index',{
                                   alertmessage:msg
                        })
                    })
                }
                else
                {
                    //save to db status sent
                    mailer.mailSentItems(validEmail,emailCc,emailBcc,subject, message,"Sent via SendGrid")
                    return res.render('index',{
                                    alertmessage:"Message Sent..."
                    })
                }
          })

        
    }

}