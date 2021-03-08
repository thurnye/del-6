const express = require('express');
const router = express.Router();
const controller = require('../controller/controller')

/* GET home page. */
router.get('/', controller.getIndex);

router.get('/add-flight', controller.getForm);

router.post('/add-flight', controller.postForm);

router.get('/single-flight/edit/:id', controller.getEditFlight);

router.post('/', controller.postEditUpdate);

router.get('/single-flight/:id', controller.getOneFlight)



module.exports = router;
