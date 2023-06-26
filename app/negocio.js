var conector = require('./conector')
var jwt = require('jsonwebtoken');

exports.listaUsuarios = function(req, res){
    conector.buscarPersonas((data) => {
      console.log('Datos recibidos:', data); // Verifica los datos recibidos
  
      if (res && res.json) {
        res.json(data);
      } else {
        console.error('El objeto res no es válido');
      }
    });
  }

exports.iniciarSesion = function(name, pass, res) {
  conector.iniciarSesion(name, pass, function(error, data) {
    if(error){
      res.status(500).json({error: "Error en la consulta"});
    }
    else{
      res.json(data);
    }
  })
}

exports.registrarUsuario = function(name, pass, direccion, imagen, fechaNac, dni, tipoUsuario, res){
  conector.registrar(name, pass, direccion, imagen, fechaNac, dni, tipoUsuario, function(error, data) {
    console.log("Datos recibidos: ", data);
    if(res && res.json){
      res.json(data)
    }
    else{
      console.error("El objeto res no es valido")
    }
  })
}

exports.leerUsuarioPorId = function(id, res) {
  conector.leerUsuarioPorId(id, function(error, data){
    console.log("Datos recibidos: ", data);
    if(res && res.json){
      res.json(data);
    }
    else{
      console.error("El objeto res no es valido");
    }
  })
}

exports.updateUsuario = function(id, name, pass, direccion, imagen, tipoUsuario, res){
  conector.updateUsuario(id, name, pass, direccion, imagen, tipoUsuario, function(error, data) {
    console.log("Datos recibidos: ", data);
    if(res && res.json){
      res.json(data)
    }
    else{
      console.error("El objeto res no es valido")
    }
  })
}