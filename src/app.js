const path = require('path');
const f = require('./functions_app.js');
const express = require('express');
const bodyParser = require('body-parser');
const { inherits } = require('util');


const app = express();
const url = 'localhost';
const port = 7000;
const publicDirectory = path.join(__dirname, '../publico/');

app.use(express.static(publicDirectory));
app.use(bodyParser.json());

app.post('/enviar_correo', (req, res) => {
  console.log("entro a endpoint /enviar_correo");
  var fecha = f.formato_fecha();
  f.conectar_mongodb().
    then(client => {
      var correo_destino = req.body.correo;
      var texto = req.body.texto;
      const db = client.db('test');
      const collection = db.collection('correos');
      collection.insertOne({ fecha_envio: fecha, correo_destino: correo_destino, body: texto }, (err, result) => {
        collection.find({ fecha_envio: fecha }).toArray((err, items) => console.log(items))
      })
      console.log("correo destino: " + correo_destino + ", cuerpo del correo: " + texto);
      var from_string = 'Envio Correo API';
      var asunto = 'Diplomatura UADE Hackaton AGO-2020';
      f.enviar_correo(from_string, correo_destino, asunto, texto);
      var msg = "Correo enviado correctamente a: " + correo_destino;
      res.send(msg);
    }).then(client => f.cerrar_mongodb(client))
});

app.get('/ver_envios/:filas', (req, res) => {
  console.log("entro a endpoint /ver_envios");
  var filas = Number(req.params.filas);
  f.conectar_mongodb().
    then(client => {
      const db = client.db('test');
      const collection = db.collection('correos');
      collection.find().sort( { fecha_envio: -1 } ).limit(filas).toArray((err, items) => {
        console.log(items);
        res.send(items);
      });
    }).then(client => f.cerrar_mongodb(client))
});

app.listen(port, () => {
    console.log('Aplicacion corriendo en http://' + url + ":" + port);
});