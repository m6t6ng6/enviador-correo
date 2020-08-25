const config = require('./setup.json');
const nodemailer = require('nodemailer');   // paquete de nodemailer
const mongo = require('mongodb').MongoClient;    // manejador de mongodb
const Promise = require('promise');   // paquete de promesas

module.exports.enviar_correo = (from_string, to_string, asunto, texto) => {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: config.email_auth.uade_testing.user,
          pass: config.email_auth.uade_testing.pass 
      }
    });
  
    let mailOptions = {
      from: from_string,
      to: to_string,
      subject: asunto, 
      text: texto
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Correo enviado: ' + info.response);
      }
    });
  }

module.exports.conectar_mongodb = () => {
  return new Promise((resolve, reject) => {
    mongo.connect(config.mongodb_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (err, client) => {
      if (err) {
        reject(err);
      } else {
        console.log("Se inició conexión con la base de datos.");
        resolve(client);
      }
    });
  }); 
};

module.exports.cerrar_mongodb = (client) => {
  client.close();
  console.log("Se cerró la conexión con la base de datos.");
};

module.exports.formato_fecha = () => {
  // entrega horario local del servidor
  var date = new Date();
  var date = date.setHours(date.getHours() - date.getTimezoneOffset()/60);
  return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
}