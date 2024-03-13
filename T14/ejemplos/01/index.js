// Envío de EMAIL

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'killerpanzer99@gmail.com', // Cuenta que se usa para el envío
      pass: "gcdl fona vfqq iwaf"
      // Poner password
    }
  });
  
  var mailOptions = {
    from: 'killerpanzer99@ieslosremedios.org', // Correo remitente
    to: 'atelper1005@g.educaand.es', // Correo destino
    subject: 'Enviando correo desde Node.js',
    html: '<h1>Hola desde Node.js</h1>'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Correo enviado: ' + info.response);
    }
  });