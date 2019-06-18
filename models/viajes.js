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


// Consulta para filtar un viaje segun consulta
let filter = (consulta) => {
	return new Promise((resolve, reject) => {

		let query = "";

		query = "SELECT viajes.id, viajes.titulo, viajes.descripcion, viajes.foto, viajes.fecha_inicio, viajes.fecha_fin, viajes.alojamiento, viajes.viajeros_max, viajes.nivel_economico,viajes.fecha_creacion, viajes.fk_organizador AS id_organizador, viajeros.foto_perfil, COUNT(DISTINCT viajeros_viajes.id) AS total_viajeros, COUNT(DISTINCT viajes_destinos.id) AS total_destinos, COUNT(DISTINCT actividades.id) AS total_actividades FROM viajes JOIN viajeros ON viajes.fk_organizador = viajeros.id LEFT JOIN viajeros_viajes ON viajeros_viajes.fk_viajes = viajes.id LEFT JOIN viajes_destinos ON viajes_destinos.fk_viajes = viajes.id LEFT JOIN actividades ON actividades.fk_viajes = viajes.id LEFT JOIN destinos ON destinos.id = viajes_destinos.fk_destinos WHERE 1 = 1";

		if (consulta.destino != '') {
			query += ` AND (destinos.nombre = '${consulta.destino}' OR viajes.titulo LIKE '%${consulta.destino}%')`;
		}
		if (consulta.fecha_inicio != '') {
			query += ` AND viajes.fecha_inicio = '${consulta.fecha_inicio}'`;
		}
		if (consulta.fecha_fin != '') {
			query += ` AND viajes.fecha_fin = '${consulta.fecha_fin}'`;
		}
		if (consulta.viajeros_max != '') {
			query += ` AND viajes.viajeros_max <= '${consulta.viajeros_max}'`;
		}
		if (consulta.tipo_alojamiento != '') {
			query += ` AND viajes.alojamiento = '${consulta.tipo_alojamiento}'`;
		}
		if(consulta.nivel_economico != '') {
			query += ` AND viajes.nivel_economico = '${consulta.nivel_economico}'`;
		}

		query += " GROUP BY 1"

		db.get().query(query, (err, rows) => {
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


// Consulta para obtener un viaje segun su ID
let getByIdResumen = (idViaje) => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT viajes.id, viajes.titulo, viajes.fecha_inicio, viajes.fecha_fin, viajes.fk_organizador, DATEDIFF(viajes.fecha_fin, viajes.fecha_inicio) AS total_dias, viajes.viajeros_max, viajes.fecha_creacion, COUNT(DISTINCT viajeros_viajes.id) AS total_viajeros, COUNT(DISTINCT viajes_destinos.id) AS total_destinos, COUNT(DISTINCT actividades.id) AS total_actividades FROM viajes JOIN viajeros ON viajes.fk_organizador = viajeros.id LEFT JOIN viajeros_viajes ON viajeros_viajes.fk_viajes = viajes.id LEFT JOIN viajes_destinos ON viajes_destinos.fk_viajes = viajes.id LEFT JOIN actividades ON actividades.fk_viajes = viajes.id WHERE viajes.id = ? GROUP BY 1 ORDER BY viajes.fecha_inicio ASC', [idViaje], (err, rows) => {
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
let getByIdSimple = (idViaje) => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT * FROM viajes WHERE viajes.id = ?', [idViaje], (err, rows) => {
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


// Consulta para obtener los viajes en los que participa un usuario según ID
let getByIdUsuario = (idUsuario) => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT viajes.id, viajes.titulo, viajes.fecha_inicio, viajes.fecha_fin, viajes.fk_organizador, DATEDIFF(viajes.fecha_fin, viajes.fecha_inicio) AS total_dias, viajes.viajeros_max, viajes.fecha_creacion, COUNT(DISTINCT viajeros_viajes.id) AS total_viajeros, COUNT(DISTINCT viajes_destinos.id) AS total_destinos, COUNT(DISTINCT actividades.id) AS total_actividades FROM viajes  JOIN viajeros_viajes ON viajes.id = viajeros_viajes.fk_viajes LEFT JOIN viajeros ON viajeros.id = viajeros_viajes.fk_viajeros LEFT JOIN viajes_destinos ON viajes_destinos.fk_viajes = viajes.id LEFT JOIN actividades ON actividades.fk_viajes = viajes.id WHERE viajeros.id = ? GROUP BY 1 ORDER BY viajes.fecha_inicio ASC', [idUsuario], (err, rows) => {
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
				console.log(result.insertId);
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


// Insertar destino 
let insertDestino = (values) => {
	return new Promise((resolve, reject) => {
		db.get().query('INSERT INTO destinos(nombre, latitud, longitud) VALUES(?, ?, ?)', [values.nombre, values.latitud, values.longitud], (err, result) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(result);
			}
		});
	});
}


// Insertar un destino con un viaje en la tabla intermedia
let insertViajesDestinos = (values) => {
	return new Promise((resolve, reject) => {
		db.get().query('INSERT INTO viajes_destinos(viajes_destinos.fk_viajes, viajes_destinos.fk_destinos) VALUES(?, ?)', [values.fk_viajes, values.fk_destinos], (err, result) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(result);
			}
		});
	});
}


// Obtener destino por nombre y todo 
let getDestinoByAll = (values) => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT * FROM destinos WHERE nombre = ? AND latitud = ? AND longitud = ?', [values.nombre, values.longitud, values.latitud], (err, rows) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(rows);
			}
		});
	});
}

// Obtener destinos por id viaje 
let getDestinosByIdViaje = (id_viaje) => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT destinos.nombre, destinos.latitud, destinos.longitud FROM destinos JOIN viajes_destinos ON destinos.id = viajes_destinos.fk_destinos JOIN viajes ON viajes.id = viajes_destinos.fk_viajes WHERE viajes.id = ?', [id_viaje], (err, rows) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(rows);
			}
		});
	});
}


// Insertar una actividad
let insertActividad = (values) => {
	return new Promise((resolve, reject) => {
		db.get().query('INSERT INTO actividades(actividades.fk_viajes, actividades.nombre) VALUES(?, ?)', [values.fk_viajes, values.nombre], (err, result) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(result);
			}
		});
	});
}


// Obtener activades por id viaje 
let getActividadesByIdViaje = (id_viaje) => {
	return new Promise((resolve, reject) => {
		db.get().query('SELECT actividades.id, actividades.nombre FROM actividades JOIN viajes ON viajes.id = actividades.fk_viajes WHERE viajes.id = ?', [id_viaje], (err, rows) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(rows);
			}
		});
	});
}


// Borrar un viaje
let deleteViaje = (id_viaje) => {
	return new Promise((resolve, reject) => {
		db.get().query('DELETE FROM viajes WHERE id = ?', [id_viaje], (err, result) => {
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
	getByIdResumen: getByIdResumen,
	getByIdSimple: getByIdSimple,
	insert: insert,
	updateById: updateById,
	getByIdOrganizador: getByIdOrganizador,
	getByIdUsuario: getByIdUsuario,
	filter: filter,
	insertDestino: insertDestino,
	getDestinoByAll: getDestinoByAll,
	insertViajesDestinos: insertViajesDestinos,
	insertActividad: insertActividad,
	deleteViaje: deleteViaje,
	getDestinosByIdViaje: getDestinosByIdViaje,
	getActividadesByIdViaje: getActividadesByIdViaje
}