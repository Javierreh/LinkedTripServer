const db = require('../db');


// Consulta para obtener TODOS los viajes
let getAll = () => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT * FROM viajes', (err, rows) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(rows);
			}
		});
	});
}


// Consulta para obtener un viaje segun su ID
let getById = (idViaje) => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT * FROM viajes WHERE id = ?', [idViaje], (err, rows) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(rows);
			}
		});
	});
}


// Insertar un nuevo viaje
let insert = (values) => {
	return new Promise((resolve, reject) => {
		db.get().query('INSERT INTO viajes(fk_organizador, titulo, descripcion, foto, viajeros_max, fecha_inicio, fecha_fin, etiquetas, alojamiento, nivel_economico) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [values.fk_organizador, values.titulo, values.descripcion, values.foto, values.viajeros_max, values.fecha_inicio, values.fecha_fin, values.etiquetas, values.alojamiento, values.nivel_economico], (err, result) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(result);
			}
		});
	});
}


// Actualizar la información del viaje segun ID
let updateById = (values) => {
	return new Promise((resolve, reject) => {
		db.get().query('UPDATE viajes SET titulo = ?, descripcion = ?, foto = ?, viajeros_max = ?, fecha_inicio = ?, fecha_fin = ?, etiquetas = ?, alojamiento = ?, nivel_economico = ? WHERE id = ?', [values.titulo, values.descripcion, values.foto, values.viajeros_max, values.fecha_inicio, values.fecha_fin, values.etiquetas, values.alojamiento, values.nivel_economico, values.id], (err, result) => {
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