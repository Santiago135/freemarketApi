const md5 = require('md5');

const sql = require("mssql/msnodesqlv8");
const conn = new sql.ConnectionPool({
    database: "programacion3",
    server: "localhost",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
});

function conectar() {
    return conn.connect()
        .then(pool => {
            console.log('Conexión establecida correctamente.');
        });
}


exports.buscarPersonas = function (callback) {
    conectar()
        .then(() => {
            const request = new sql.Request(conn);
            request.query('SELECT * FROM usuarios')
                .then(result => {
                    const response = {
                        success: true,
                        message: "Usuarios obtenidos",
                        data: result.recordset
                    };
                    callback(response);
                })
                .catch(error => {
                    console.error('Error al ejecutar la consulta:', error);
                })
                .finally(() => {
                    sql.close();
                });
        })
        .catch(error => {
            console.error('Error al conectar con la base de datos:', error);
            sql.close();
        });
};

exports.iniciarSesion = function (name, pass, callback) {
    conectar().then(() => {
        const request = new sql.Request(conn);
        const query = "SELECT * FROM usuarios WHERE usuarios.nombre = @nombre"
        request.input('nombre', sql.VarChar, name);
        console.log(name)
        request.query(query)
            .then(result => {
                if (result.recordset.length > 0) {
                    if (result.recordset[0].password == pass) {
                        console.log("Usuario encontrado");
                        const response = {
                            success: true,
                            message: "Inicio de sesión exitoso",
                            data: result.recordset[0].nombre
                        };
                        callback(null, response);
                    } else {
                        console.log("Contraseña incorrecta");
                        const response = {
                            success: false,
                            message: "Contraseña incorrecta",
                            data: null
                        };
                        callback(null, response);
                    }
                } else {
                    console.log("Usuario inexistente");
                    const response = {
                        success: false,
                        message: "Usuario no existente",
                        data: null
                    };
                    callback(null, response);
                }
            }).catch(error => {
                console.error('Error al ejecutar la consulta:', error);
            }).finally(() => {
                sql.close();
            });
    }).catch(error => {
        console.error('Error al conectar con la base de datos:', error);
        sql.close();
    });
};

exports.registrar = function (name, pass, direccion, imagen, fechaNac, dni, tipoUsuario, callback) {
    conectar().then(() => {
        const request = new sql.Request(conn);
        const query = "INSERT INTO usuarios(nombre, password, direccion, imagen, fechaNac, dni, tipoUsuario) values(@nombre, @password, @direccion, @imagen, @fechaNac, @dni, @tipoUsuario)";

        request.input('nombre', sql.VarChar, name);
        request.input('password', sql.VarChar, pass);
        request.input('direccion', sql.VarChar, direccion);
        request.input('imagen', sql.VarChar, imagen);
        request.input('fechaNac', sql.VarChar, fechaNac);
        request.input('dni', sql.Int, dni);
        request.input('tipoUsuario', sql.Int, tipoUsuario);
        request.query(query)
            .then(result => {
                const response = {
                    success: true,
                    message: "Usuario creado con exito",
                    data: null
                };
                callback(null, response);
            }).catch(error => {
                const response = {
                    success: false,
                    message: error,
                    data: null
                };
                console.error('Error al ejecutar la consulta:', error);
            })
            .finally(() => {
                sql.close();
            });
    }).catch(error => {
        console.error('Error al conectar con la base de datos:', error);
        const response = {
            success: false,
            message: 'Error al conectar con la base de datos:' + error,
            data: null
        };
        sql.close();
    })
}


exports.leerUsuarioPorId = function (id, callback) {
    conectar().then(() => {
        const request = new sql.Request(conn);
        const query = "SELECT * FROM usuarios WHERE id = @id";

        request.input('id', sql.Int, id);
        request.query(query)
            .then(result => {
                if (result.recordset.length > 0) {
                    const response = {
                        success: true,
                        message: "Usuario obtenido!",
                        data: result.recordset[0]
                    };
                    callback(null, response);
                } else {
                    const response = {
                        success: false,
                        message: "Usuario no encontrado!",
                        data: null
                    };
                    callback(null, response);
                }
            })
            .catch(error => {
                console.error('Error al ejecutar la consulta:', error);
                callback(error);
            })
            .finally(() => {
                sql.close();
            });
    }).catch(error => {
        console.error('Error al conectar con la base de datos:', error);
        sql.close();
    })
}

exports.updateUsuario = function (id, name, pass, direccion, imagen, tipoUsuario, callback) {
    conectar().then(() => {
        const request = new sql.Request(conn);
        const query = "UPDATE usuarios SET nombre = @nombre, password = @password, direccion = @direccion, imagen = @imagen, tipoUsuario = @tipoUsuario WHERE usuarios.id = '" + id + "'";

        request.input('nombre', sql.VarChar, name);
        request.input('password', sql.VarChar, pass);
        request.input('direccion', sql.VarChar, direccion);
        request.input('imagen', sql.VarChar, imagen);
        request.input('tipoUsuario', sql.Int, tipoUsuario);
        request.query(query)
            .then(result => {
                callback(null, "exito");
            }).catch(error => {
                console.error('Error al ejecutar la consulta:', error);
            })
            .finally(() => {
                sql.close();
            });
    }).catch(error => {
        console.error('Error al conectar con la base de datos:', error);
        sql.close();
    })
}