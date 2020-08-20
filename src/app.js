const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 7000;
const publicDirectory = path.join(__dirname, '../publico/');

app.use(express.static(publicDirectory));
app.use(bodyParser.json());

app.post('/enviar_correo', (req, res) => {
  console.log("entro a enviar_correo");
  var correo = req.body.correo;
  var texto = req.body.texto;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'diplouade2020@gmail.com',
        pass: 'U4D32020!!'
    }
  });

  let mailOptions = {
    from: 'diplouade2020@gmail.com',
    to: correo,
    subject: 'test hackaton desde landpage',
    text: texto
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  var msg = "Correo enviado correctamente a: " + correo;
  console.log(msg);
  res.send(msg);
});

app.listen(port, () => {
    console.log('Aplicacion corriendo en puerto ' + port);
});