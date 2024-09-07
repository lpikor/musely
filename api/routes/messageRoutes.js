const express = require('express');
const { getMessages, createMessage, deleteMessage } = require('../controllers/messageController');
const router = express.Router();

router.get('/messages', getMessages);
router.post('/messages', createMessage);
router.delete('/messages/:id', deleteMessage);

module.exports = router;
