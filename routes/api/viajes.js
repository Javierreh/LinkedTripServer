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


/* Ruta para filtrar viajes segun los datos que se le pasan */
router.post('/filtrados', (req, res) => {
	viajesModel.filter(req.body).then(rows => {
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


/* Ruta para obtener un viaje (simple) según su ID */
router.get('/simple/:idViaje', function(req, res) {
	viajesModel.getByIdSimple(req.params.idViaje).then(rows => {
		if (rows.length === 0) res.json({ mensaje: `Ningún viaje encontrado con el ID ${req.params.idViaje}` });
		res.json(rows);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para obtener los viajes según ID del organizador */
router.get('/organizador/:idOrganizador', function(req, res) {
	viajesModel.getByIdOrganizador(req.params.idOrganizador).then(rows => {
		res.json(rows);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para obtener los viajes en los que participa un usuario */
router.get('/usuario/:idUsuario', function(req, res) {
	viajesModel.getByIdUsuario(req.params.idUsuario).then(rows => {
		res.json(rows);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para insertar un nuevo viajero */
router.post('/new', (req, res) => {
	viajesModel.insert(req.body).then(result => {
		res.json(result.insertId);
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


/* Ruta para insertar un nuevo destino */
router.post('/destino/new', (req, res) => {
	viajesModel.insertDestino(req.body).then(result => {
		res.json(result.insertId);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para insertar un nuevo destino */
router.post('/viajes_destinos/new', (req, res) => {
	viajesModel.insertViajesDestinos(req.body).then(result => {
		res.json(result);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para encontrar destinos por todo */
router.get('/destino/:nombre/:latitud/:longitud', (req, res) => {
	viajesModel.getDestinoByAll(req.params).then(rows => {
		res.json(rows);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para insertar una nueva actividad */
router.post('/actividad/new', (req, res) => {
	viajesModel.insertActividad(req.body).then(result => {
		res.json(result);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


module.exports = router;