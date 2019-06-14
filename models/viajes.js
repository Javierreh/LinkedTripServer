const db = require('../db');


// Consulta para obtener TODOS los viajes
let getAll = () => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT viajes.id, viajes.titulo, viajes.descripcion, viajes.foto, viajes.fecha_inicio, viajes.fecha_fin, viajes.alojamiento, viajes.viajeros_max, viajes.fecha_creacion, viajes.fk_organizador AS id_organizador, viajeros.foto_perfil, COUNT(DISTINCT viajeros_viajes.id) AS total_viajeros, COUNT(DISTINCT viajes_destinos.id) AS total_destinos, COUNT(DISTINCT actividades.id) AS total_actividades FROM viajes JOIN viajeros ON viajes.fk_organizador = viajeros.id LEFT JOIN viajeros_viajes ON viajeros_viajes.fk_viajes = viajes.id LEFT JOIN viajes_destinos ON viajes_destinos.fk_viajes = viajes.id LEFT JOIN actividades ON actividades.fk_viajes = viajes.id GROUP BY 1 ORDER BY viajes.fecha_creacion DESC', (err, rows) => {
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
		db.get().query('SELECT viajes.id, viajes.titulo, viajes.descripcion, viajes.foto, viajes.fecha_inicio, viajes.fecha_fin, DATEDIFF(viajes.fecha_fin, viajes.fecha_inicio) AS total_dias, viajes.etiquetas, viajes.alojamiento, viajes.nivel_economico, viajes.viajeros_max, viajes.fecha_creacion, viajeros.id AS id_organizador, viajeros.usuario AS usuario_organizador, viajeros.foto_perfil AS foto_organizador, ROUND(AVG(puntuaciones.puntos), 1) AS puntuacion_organizador, GROUP_CONCAT(DISTINCT destinos.nombre SEPARATOR " / ") AS destinos_viaje, GROUP_CONCAT(DISTINCT actividades.nombre SEPARATOR " / ") AS actividades_viaje, GROUP_CONCAT(DISTINCT v.usuario SEPARATOR " / ") AS viajeros_viaje, COUNT(DISTINCT v.usuario) AS total_viajeros FROM viajes JOIN viajeros ON viajes.fk_organizador = viajeros.id LEFT JOIN puntuaciones ON puntuaciones.fk_viajero_recibe = viajeros.id LEFT JOIN viajeros_viajes ON viajeros_viajes.fk_viajes = viajes.id LEFT JOIN viajeros v ON v.id = viajeros_viajes.fk_viajeros LEFT JOIN viajes_destinos ON viajes_destinos.fk_viajes = viajes.id LEFT JOIN destinos ON viajes_destinos.fk_destinos = destinos.id LEFT JOIN actividades ON actividades.fk_viajes = viajes.id WHERE viajes.id = ?', [idViaje], (err, rows) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(rows);
			}
		});
	});
}


// Consulta para obtener los viajes según ID del organizador
let getByIdOrganizador = (idOrganizador) => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT viajes.id, viajes.titulo, viajes.fecha_inicio, viajes.fecha_fin, viajes.fk_organizador, DATEDIFF(viajes.fecha_fin, viajes.fecha_inicio) AS total_dias, viajes.viajeros_max, viajes.fecha_creacion, COUNT(DISTINCT viajeros_viajes.id) AS total_viajeros, COUNT(DISTINCT viajes_destinos.id) AS total_destinos, COUNT(DISTINCT actividades.id) AS total_actividades FROM viajes JOIN viajeros ON viajes.fk_organizador = viajeros.id LEFT JOIN viajeros_viajes ON viajeros_viajes.fk_viajes = viajes.id LEFT JOIN viajes_destinos ON viajes_destinos.fk_viajes = viajes.id LEFT JOIN actividades ON actividades.fk_viajes = viajes.id WHERE viajes.fk_organizador = ? GROUP BY 1 ORDER BY viajes.fecha_inicio ASC', [idOrganizador], (err, rows) => {
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
	updateById: updateById,
	getByIdOrganizador
}