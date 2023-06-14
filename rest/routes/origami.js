const controllers = require('../controllers/');
const router = require('express').Router();
const { auth } = require('../utils');

router.get('/all', controllers.origami.get.all);

router.get('/mine', auth(), controllers.origami.get.mine);

router.post('/', auth(), controllers.origami.post);

router.put('/:id', auth(), controllers.origami.put);

router.delete('/:id', auth(), controllers.origami.delete);

module.exports = router;