import http from 'http';
import app from './app';
import sequelize from '../sequelize';
import socketApi from './socket';

const PORT = process.env.PORT || 8889;

const server = http.createServer(app);

const connectToDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

socketApi.io.attach(server, {
  cors: {
    origin: '*',
  },
});

const init = async () => {
  await connectToDb();

  server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
};

init();
