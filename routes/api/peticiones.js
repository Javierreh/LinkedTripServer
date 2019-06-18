let express = require('express');
let router = express.Router();

let peticionesModel = require('../../models/peticiones');


/* Ruta para obtener TODAS las peticiones */
router.get('/', (req, res) => {
	peticionesModel.getAll().then(rows => {
		res.json(rows);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para obtener las peticiones segun el ID del organizador */
router.get('/organizador/:id_organizador', function(req, res) {
	peticionesModel.getPeticionesByIdOrganizador(req.params.id_organizador).then(rows => {
		res.json(rows);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para obtener las peticiones segun el usuario que la envia */
router.get('/usuario/:id_usuario', function(req, res) {
	peticionesModel.getPeticionesByIdUser(req.params.id_usuario).then(rows => {
		res.json(rows);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para insertar una nueva peticion */
router.post('/new', (req, res) => {
	peticionesModel.insertPeticion(req.body).then(result => {
		res.json(result);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para eliminar una peticion */
router.delete('/delete/:id_peticion', (req, res) => {
	peticionesModel.deletePeticion(req.params.id_peticion).then(result => {
		res.json(result);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para eliminar una peticion */
router.put('/aceptar', (req, res) => {
	peticionesModel.aceptarPeticion(req.body).then(result => {
		res.json(result);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para insertar un viajero en un viaje */
router.post('/newMiembro', (req, res) => {
	peticionesModel.insertMiembro(req.body).then(result => {
		res.json(result);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para eliminar una miembro de un viaje */
router.delete('/deleteMiembro/:fk_viajeros/:fk_viajes', (req, res) => {
	peticionesModel.deleteMiembro(req.params).then(result => {
		res.json(result);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


module.exports = router;