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
	peticionesModel.getByIdOrganizador(req.params.id_organizador).then(rows => {
		if (rows.length === 0) res.json({ mensaje: `El organizador con ID ${req.params.id_organizador} no tiene ninguna petición` });
		res.json(rows);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para obtener las peticiones segun el usuario que la envia */
router.get('/usuario/:id_usuario', function(req, res) {
	peticionesModel.getByIdUser(req.params.id_usuario).then(rows => {
		if (rows.length === 0) res.json({ mensaje: `El usuario con ID ${req.params.id_usuario} no tiene ninguna petición pendiente` });
		res.json(rows);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


module.exports = router;