const Location = require('../models/locationModel');

exports.getLocations = async (req, res) => {
    const locations = await Location.find();
    res.json(locations);
};

exports.createLocation = async (req, res) => {
    const newLocation = new Location(req.body);
    await newLocation.save();
    res.json(newLocation);
};

exports.deleteLocation = async (req, res) => {
    try {
        await Location.findByIdAndDelete(req.params.id);
        res.status(200).send('Location deleted');
    } catch (error) {
        res.status(500).send('Error deleting location');
    }
};
