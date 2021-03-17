import { Server } from 'socket.io';

const io = new Server();
const socketApi = {
  io,
};

io.on('connection', (socket) => {
  console.log('connected');
  socket.on('joinConversationRoom', async (conversationId) => {
    socket.join(`conversation-${conversationId}`);
  });
  socket.on('registerSocket', (id) => {
    socket.userId = id;
  });
});

export default socketApi;
