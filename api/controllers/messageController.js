const Message = require('../models/messageModel');

exports.getMessages = async (req, res) => {
    const messages = await Message.find();
    res.json(messages);
};

exports.createMessage = async (req, res) => {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.json(newMessage);
};

exports.deleteAllMessages = async (req, res) => {
    try {
        await Message.deleteMany({});
        res.status(200).send('All messages deleted');
    } catch (error) {
        res.status(500).send('Error deleting all messages');
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        await Message.findByIdAndDelete(req.params.id);
        res.status(200).send('Message deleted');
    } catch (error) {
        res.status(500).send('Error deleting message');
    }
};
