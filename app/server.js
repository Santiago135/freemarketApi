var express = require('express');
var cors = require('cors');
var jwt = require('jsonwebtoken');
var negocio = require('./negocio');


var app = express();
app.use(cors());
app.use(express.json());

app.get("/usuarios/", negocio.listaUsuarios);

app.post("/login/", (req, res) => {
    console.log(req.body.nombre);
    console.log(req.body.password);
    let name = req.body.nombre;
    let pass = req.body.password;

    negocio.iniciarSesion(name, pass, res);
}) ;

app.post("/register/", (req, res) => {
    console.log(req.body);
    let name = req.body.nombre;
    let pass = req.body.password;
    let direccion = req.body.direccion;
    let imagen = req.body.imagen;
    let fechaNac = req.body.fechaNac;
    let dni = req.body.dni;
    let tipoUsuario = req.body.tipoUsuario;

    negocio.registrarUsuario(name, pass, direccion, imagen, fechaNac, dni, tipoUsuario, res);
})

app.put("/updateUsuario/", (req, res) => {
    let id = req.body.id;
    let name = req.body.nombre;
    let pass = req.body.password;
    let direccion = req.body.direccion;
    let imagen = req.body.imagen;
    let tipoUsuario = req.body.tipoUsuario;

    negocio.updateUsuario(id, name, pass, direccion, imagen, tipoUsuario, res);
})

app.get("/leerUsuarioPorId", (req, res) => {
    let id = req.body.id;

    negocio.leerUsuarioPorId(id, res);
})
app.listen(7200, () => {
    console.log('escuchando el puerto');
})