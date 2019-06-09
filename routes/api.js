let express = require('express');
let router = express.Router();

let viajerosApiRouter = require('./api/viajeros');
let viajesApiRouter = require('./api/viajes');

router.use('/viajeros', viajerosApiRouter)
router.use('/viajes', viajesApiRouter)

module.exports = router;