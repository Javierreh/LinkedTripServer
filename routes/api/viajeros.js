let express = require('express');
let router = express.Router();

let viajerosModel = require('../../models/viajeros');

/* Ruta para obtener TODOS los viajeros */
router.get('/', function(req, res) {
	viajerosModel.getAll().then(rows => {
		res.json(rows);
	})
	.catch(err => {
		res.json({ error: err });
	});
});

/* Ruta para obtener un viajero según su ID */
router.get('/:idViajero', function(req, res) {
	viajerosModel.getById(req.params.idViajero).then(rows => {
		if (rows.length === 0) res.json({ error: `Ningún viajero encontrado con el ID ${req.params.idViajero}` });
		res.json(rows);
	})
	.catch(err => {
		res.json({ error: err });
	});
});

module.exports = router;