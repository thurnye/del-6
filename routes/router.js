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

router.post('/single-flight/delete-flight/:id', controller.deleteFlight)

router.post('/single-flight/:id/add-arrival', controller.postArrival)

module.exports = router;
