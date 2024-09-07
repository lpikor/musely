const express = require('express');
const { getLocations, createLocation, deleteLocation } = require('../controllers/locationController');
const router = express.Router();

router.get('/locations', getLocations);
router.post('/locations', createLocation);
router.delete('/locations/:id', deleteLocation);

module.exports = router;
