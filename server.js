const express = require('express');
const socket = require('socket.io');

const app = express();

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server); 