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


// Consulta para obtener un viajero segun su ID
let getById = (idViajero) => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT * FROM viajeros WHERE id = ?', [idViajero], (err, rows) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(rows);
			}
		});
	});
}


// Insertar un nuevo viajero
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


// Actualizar la información del viajero segun ID
let updateById = (values) => {
	return new Promise((resolve, reject) => {
		db.get().query('UPDATE viajeros SET usuario = ?, password = ?, email = ?, nombre = ?, apellidos = ?, sobre_mi = ?, intereses = ?, foto_perfil = ?, ciudad = ?, fecha_nacimiento = ?, sexo = ?, educacion = ?, ocupacion = ?, idiomas = ? WHERE id = ?', [values.usuario, values.password, values.email, values.nombre, values.apellidos, values.sobre_mi, values.intereses, values.foto_perfil, values.ciudad, values.fecha_nacimiento, values.sexo, values.educacion, values.ocupacion, values.idiomas, values.id_viajero], (err, result) => {
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
	getById: getById,
	insert: insert,
	updateById: updateById
}