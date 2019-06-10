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
		if (rows.length === 0) res.json({ mensaje: `Ningún viajero encontrado con el ID ${req.params.idViajero}` });
		res.json(rows);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para insertar un nuevo viajero */
router.post('/new', (req, res) => {
	viajerosModel.insert(req.body).then(result => {
		res.json(result);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para actualizar los datos un viajero según su ID */
router.put('/edit', (req, res) => {
	viajerosModel.updateById(req.body).then(result => {
		res.json({ exito: 'Viajero editado correctamente' });
	})
	.catch(err => {
		res.json({ error: err });
	});
});


module.exports = router;