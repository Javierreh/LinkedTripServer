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

module.exports = {
	getAll: getAll,
	getById: getById
}