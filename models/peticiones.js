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
let getPeticionesByIdOrganizador = (id_organizador) => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT viajes.id AS id_viaje, viajes.titulo AS titulo_viaje, viajes.fecha_inicio, viajeros.id AS id_viajero, viajeros.usuario AS usuario_viajero, peticiones.id AS id_peticion, peticiones.comentario, peticiones.fecha AS fecha_peticion, peticiones.aceptado FROM peticiones JOIN viajes ON viajes.id = peticiones.fk_viajes JOIN viajeros ON viajeros.id = peticiones.fk_viajeros WHERE viajes.fk_organizador = ? AND peticiones.aceptado = 0', [id_organizador], (err, rows) => {
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
let getPeticionesByIdUser = (id_usuario) => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT viajes.id AS id_viaje, viajes.titulo AS titulo_viaje, viajes.fecha_inicio, viajeros.id AS id_viajero, viajeros.usuario AS usuario_viajero, peticiones.id AS id_peticion, peticiones.comentario, peticiones.fecha AS fecha_peticion, peticiones.aceptado FROM peticiones JOIN viajes ON viajes.id = peticiones.fk_viajes JOIN viajeros ON viajeros.id = peticiones.fk_viajeros WHERE peticiones.fk_viajeros = ? AND peticiones.aceptado = 0', [id_usuario], (err, rows) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(rows);
			}
		});
	});
}


// Insertar una peticion
let insertPeticion = (values) => {
	return new Promise((resolve, reject) => {
		db.get().query('INSERT INTO peticiones(peticiones.fk_viajeros, peticiones.fk_viajes, peticiones.comentario) VALUES(?, ?, ?)', [values.fk_viajeros, values.fk_viajes, values.comentario], (err, result) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(result);
			}
		});
	});
}


// Borrar una petición
let deletePeticion = (id_peticion) => {
	return new Promise((resolve, reject) => {
		db.get().query('DELETE FROM peticiones WHERE id = ?', [id_peticion], (err, result) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(result);
			}
		});
	});
}


// Aceptar una petición
let aceptarPeticion = (values) => {
	return new Promise((resolve, reject) => {
		db.get().query('UPDATE peticiones SET aceptado = 1 WHERE peticiones.id = ?', [values.id_peticion], (err, result) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(result);
			}
		});
	});
}


// Insertar una peticion
let insertMiembro = (values) => {
	return new Promise((resolve, reject) => {
		db.get().query('INSERT INTO viajeros_viajes(viajeros.fk_viajeros, viajeros.fk_viajes) VALUES(?, ?)', [values.fk_viajeros, values.fk_viajes], (err, result) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(result);
			}
		});
	});
}


// Borrar una petición
let deleteMiembro = (values) => {
	return new Promise((resolve, reject) => {
		db.get().query('DELETE FROM viajeros_viajes WHERE fk_viajeros = ? AND fk_viajes = ?', [values.fk_viajeros, values.fk_viajes], (err, result) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(result);
			}
		});
	});
}


module.exports = {
	getAll: getAll,
	getPeticionesByIdOrganizador: getPeticionesByIdOrganizador,
	getPeticionesByIdUser: getPeticionesByIdUser,
	insertPeticion: insertPeticion,
	deletePeticion: deletePeticion,
	aceptarPeticion: aceptarPeticion,
	insertMiembro: insertMiembro,
	deleteMiembro: deleteMiembro
}