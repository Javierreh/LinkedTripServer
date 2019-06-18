let express = require('express');
let router = express.Router();
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jwt-simple');
const config = require('../../config');

let viajerosModel = require('../../models/viajeros');


let crearToken = (usuario) => {
	let payload = {
		user: usuario.id,
		create: moment().unix(),
		expire: moment().add(5, 'minutes').unix()
	}
	return jwt.encode(payload, config.SECRET_KEY);
}


let checkUserMiddleware = (req, res, next) => {
	if (req.headers['token']) {
		let payload = jwt.decode(req.headers['token'], config.SECRET_KEY)
		req.id = payload.user
		next();
	}
	else {
		res.json({ error: 'ERROR' })
	}
}


/* Ruta para obtener TODOS los viajeros */
router.get('/', function(req, res) {
	viajerosModel.getAll().then(rows => {
		res.json(rows);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


router.get('/test', checkUserMiddleware, function(req, res) {

	viajerosModel.getPerfilById(req.id).then(rows => {
		res.json(rows);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


router.get('/usuario', checkUserMiddleware, function(req, res) {

	viajerosModel.getUserById(req.id).then(rows => {
		res.json(rows);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para obtener un viajero según su ID */
router.get('/:idUsuario', function(req, res) {
	viajerosModel.getPerfilById(req.params.idUsuario).then(rows => {
		if (rows.length === 0) res.json({ mensaje: `Ningún usuario encontrado con el ID ${req.params.idUsuario}` });
		res.json(rows);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para obtener las puntuaciones de un perfil segun su ID */
router.get('/puntuaciones/:idUsuario', function(req, res) {
	viajerosModel.getPuntuacionesById(req.params.idUsuario).then(rows => {
		res.json(rows);
	})
	.catch(err => {
		res.json({ error: err });
	});
});


/* Ruta para insertar un nuevo viajero */
router.post('/new', (req, res) => {
	let passwordEnc = bcrypt.hashSync(req.body.password, 10);
	req.body.password = passwordEnc;
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


router.post('/login', async (req, res) => {
	let rows = await viajerosModel.getPerfilByUsuario(req.body.usuario);
	console.log(rows[0]);
	if (rows.length != 1) return res.json({ error: 'Usuario y/o contraseña erroneos' });
	
	// Password sin encriptar
	console.log(req.body.password);
	// Password encriptada
	console.log(rows[0].password);

	let iguales = bcrypt.compareSync(req.body.password, rows[0].password);
	if (iguales) {
		res.json({ token: crearToken(rows[0]) });
	}
	else {
		res.json({ error: 'Usuario y/o contraseña erroneos' })
	}

});








module.exports = router;