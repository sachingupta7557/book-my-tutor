const mailer = require('nodemailer');


const sendingMail = async (to,subject,text) => {
const transporter = mailer.createTransport ({
    service: 'gmail',
    auth:{
        user:"guptasachin0645@gmail.com",
        pass:"fkll ovxh euzq nujt"                      
    }
})

const mailOptions ={
    from:'guptasachin0645@gmail.com',
    to:to,
    subject : subject,
    text : text
}

const mailresponse =await transporter.sendMail(mailOptions); 
console.log(mailresponse);
return mailresponse;

}
module.exports = {
    sendingMail
}
