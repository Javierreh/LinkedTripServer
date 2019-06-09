let express = require('express');
let router = express.Router();

let viajesModel = require('../../models/viajes');

/* Ruta para obtener TODOS los viajes */
router.get('/', function(req, res) {
	viajesModel.getAll().then(rows => {
		res.json(rows);
	})
	.catch(err => {
		res.json({ error: err });
	});
});

/* Ruta para obtener un viaje según su ID */
router.get('/:idViaje', function(req, res) {
	viajesModel.getById(req.params.idViaje).then(rows => {
		if (rows.length === 0) res.json({ error: `Ningún viaje encontrado con el ID ${req.params.idViaje}` });
		res.json(rows);
	})
	.catch(err => {
		res.json({ error: err });
	});
});

module.exports = router;