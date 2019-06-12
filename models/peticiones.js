const db = require('../db');


// Consulta para obtener TODAS las peticiones
let getAll = () => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT peticiones.id AS id_peticion, viajes.titulo, v1.id AS id_envia, v1.usuario AS usuario_envia, peticiones.comentario, peticiones.aceptado, viajes.fk_organizador AS id_organizador, v2.usuario AS usuario_organizador FROM peticiones LEFT JOIN viajes ON peticiones.fk_viajes = viajes.id LEFT JOIN viajeros AS v1 ON peticiones.fk_viajeros = v1.id LEFT JOIN viajeros AS v2 ON v2.id = viajes.fk_organizador', (err, rows) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(rows);
			}
		});
	});
}


// Consulta para obtener las peticiones segun el ID del organizador
let getByIdOrganizador = (id_organizador) => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT peticiones.id AS id_peticion, viajes.titulo, v1.id AS id_envia, v1.usuario AS usuario_envia, peticiones.comentario, peticiones.aceptado, viajes.fk_organizador AS id_organizador, v2.usuario AS usuario_organizador FROM peticiones LEFT JOIN viajes ON peticiones.fk_viajes = viajes.id LEFT JOIN viajeros AS v1 ON peticiones.fk_viajeros = v1.id LEFT JOIN viajeros AS v2 ON v2.id = viajes.fk_organizador WHERE fk_organizador = ?', [id_organizador], (err, rows) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(rows);
			}
		});
	});
}


// Consulta para obtener las peticiones segun el usuario que la envia
let getByIdUser = (id_usuario) => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT peticiones.id AS id_peticion, viajes.titulo, v1.id AS id_envia, v1.usuario AS usuario_envia, peticiones.comentario, peticiones.aceptado, viajes.fk_organizador AS id_organizador, v2.usuario AS usuario_organizador FROM peticiones LEFT JOIN viajes ON peticiones.fk_viajes = viajes.id LEFT JOIN viajeros AS v1 ON peticiones.fk_viajeros = v1.id LEFT JOIN viajeros AS v2 ON v2.id = viajes.fk_organizador WHERE v1.id = ?', [id_usuario], (err, rows) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(rows);
			}
		});
	});
}


module.exports = {
	getAll: getAll,
	getByIdOrganizador: getByIdOrganizador,
	getByIdUser: getByIdUser
}