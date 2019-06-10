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
		if (rows.length === 0) res.json({ mensaje: `Ningún viaje encontrado con el ID ${req.params.idViaje}` });
		res.json(rows);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para insertar un nuevo viajero */
router.post('/new', (req, res) => {
	viajesModel.insert(req.body).then(result => {
		res.json(result);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para actualizar los datos un viaje según su ID */
router.put('/edit', (req, res) => {
	viajesModel.updateById(req.body).then(result => {
		res.json({ exito: 'Viaje editado correctamente' });
	})
	.catch(err => {
		res.json({ error: err });
	});
});


module.exports = router;