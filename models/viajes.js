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


module.exports = {
	getAll: getAll,
	getById: getById
}