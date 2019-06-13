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
let getPerfilById = (idUsuario) => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT * FROM viajeros WHERE id = ?', [idUsuario], (err, rows) => {
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
	getPerfilById: getPerfilById,
	insert: insert,
	updateById: updateById
}