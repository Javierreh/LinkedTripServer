const db = require('../db');


// Consulta para obtener TODOS los viajeros
let getAll = () => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT * FROM viajeros', (err, rows) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(rows);
			}
		});
	});
}


// Consulta para obtener un perfil de usuario segun su ID
let getUserById = (idUsuario) => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT * FROM viajeros WHERE viajeros.id = ?', [idUsuario], (err, rows) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(rows);
			}
		});
	});
}


// Consulta para obtener un perfil de usuario segun su ID
let getPerfilById = (idUsuario) => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT viajeros.id, viajeros.usuario, viajeros.nombre, viajeros.apellidos, viajeros.sobre_mi, viajeros.foto_perfil, viajeros.fecha_registro, viajeros.intereses, viajeros.ciudad, viajeros.sexo, viajeros.fecha_nacimiento, viajeros.educacion, viajeros.ocupacion, viajeros.idiomas, ROUND(AVG(puntuaciones.puntos), 1) AS puntuacion_media FROM viajeros LEFT JOIN viajeros_viajes ON (viajeros_viajes.fk_viajeros = viajeros.id) LEFT JOIN viajes ON (viajes.id = viajeros_viajes.fk_viajes) LEFT JOIN puntuaciones ON (puntuaciones.fk_viajero_recibe = viajeros.id) WHERE viajeros.id = ?', [idUsuario], (err, rows) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(rows);
			}
		});
	});
}


// Consulta para obtener un perfil de usuario segun nombre de usuario
let getPerfilByUsuario = (usuario) => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT * FROM viajeros WHERE usuario = ?', [usuario], (err, rows) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(rows);
			}
		});
	});
}


// Consulta para obtener un perfil de usuario segun nombre de usuario
let getPuntuacionesById = (idUsuario) => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT puntuaciones.titulo_comentario, puntuaciones.puntos, puntuaciones.comentario, puntuaciones.fk_viajero_puntua AS viajero_puntua, puntuaciones.fk_viajero_recibe AS viajero_recibe, puntuaciones.fk_viaje AS viaje, puntuaciones.fecha, viajeros.usuario AS usuario_puntua, viajes.titulo AS titulo_viaje FROM puntuaciones JOIN viajeros ON viajeros.id = puntuaciones.fk_viajero_puntua LEFT JOIN viajes ON viajes.id = puntuaciones.fk_viaje WHERE puntuaciones.fk_viajero_recibe = ?', [idUsuario], (err, rows) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(rows);
			}
		});
	});
}


// Insertar un nuevo usuario
let insert = (values) => {
	return new Promise((resolve, reject) => {
		db.get().query('INSERT INTO viajeros(usuario, password, email, nombre, apellidos, sobre_mi, intereses, foto_perfil, ciudad, fecha_nacimiento, sexo, educacion, ocupacion, idiomas) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [values.usuario, values.password, values.email, values.nombre, values.apellidos, values.sobre_mi, values.intereses, values.foto_perfil, values.ciudad, values.fecha_nacimiento, values.sexo, values.educacion, values.ocupacion, values.idiomas], (err, result) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(result);
			}
		});
	});
}


// Actualizar la información del usuario segun ID
let updateById = (values) => {
	return new Promise((resolve, reject) => {
		db.get().query('UPDATE viajeros SET usuario = ?, password = ?, email = ?, nombre = ?, apellidos = ?, sobre_mi = ?, intereses = ?, foto_perfil = ?, ciudad = ?, fecha_nacimiento = ?, sexo = ?, educacion = ?, ocupacion = ?, idiomas = ? WHERE id = ?', [values.usuario, values.password, values.email, values.nombre, values.apellidos, values.sobre_mi, values.intereses, values.foto_perfil, values.ciudad, values.fecha_nacimiento, values.sexo, values.educacion, values.ocupacion, values.idiomas, values.id], (err, result) => {
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
	getUserById: getUserById,
	getPerfilById: getPerfilById,
	getPuntuacionesById: getPuntuacionesById,
	insert: insert,
	updateById: updateById,
	getPerfilByUsuario: getPerfilByUsuario
}