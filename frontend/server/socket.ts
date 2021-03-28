import { Server } from 'socket.io';

const onlineUsers = {};

const io = new Server();
const socketApi = {
  io,
};

io.on('connection', (socket: any) => {
  console.log('connected');
  socket.on('joinConversationRoom', async (conversationId) => {
    socket.join(`conversation-${conversationId}`);
  });
  socket.on('registerSocket', (id) => {
    socket.userId = id;
    onlineUsers[id] = socket;
  });
  socket.on('disconnect', () => {
    delete onlineUsers[socket.userId];
  });
});

export const getUserById = (id) => onlineUsers[id];

export default socketApi;
