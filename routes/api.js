let express = require('express');
let router = express.Router();

let viajerosApiRouter = require('./api/viajeros');
let viajesApiRouter = require('./api/viajes');
let peticionesApiRouter = require('./api/peticiones');

router.use('/viajeros', viajerosApiRouter)
router.use('/viajes', viajesApiRouter)
router.use('/peticiones', peticionesApiRouter)

module.exports = router;