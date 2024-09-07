const Event = require('../models/eventModel');

exports.getEvents = async (req, res) => {
    const events = await Event.find();
    res.json(events);
};

exports.createEvent = async (req, res) => {
    const event = new Event(req.body);
    await event.save();
    res.json(event);
};

exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const event = await Event.findByIdAndUpdate(id, req.body, { new: true });
    res.json(event);
};

exports.deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.status(200).send('Event deleted');
    } catch (error) {
        res.status(500).send('Error deleting event');
    }
};
