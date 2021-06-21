const express = require('express');
const socket = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors(

));


const tasks = [];
console.log('tasks', tasks);


app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
})
io.on('connection', (socket) => {
  console.log('New client - its id: ', socket.id);
  io.to(socket.id).emit('updateData', tasks);

  socket.on('addTask', (newTask) => {
    console.log('New task in array: ', newTask, '(from user:' + socket.id + ')');
    tasks.push(newTask);
    socket.broadcast.emit('addTask', newTask);
  });

  socket.on('removeTask', (id) => {
    const index = tasks.indexOf(tasks.find(task => task.id === id));
    console.log('Task removed - its id:', id);
    tasks.splice(index, 1);
    socket.broadcast.emit('removeTask', id);
  });
});