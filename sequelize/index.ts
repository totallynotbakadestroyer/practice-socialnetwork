import { Sequelize } from 'sequelize';
import setAssociations from './setAssociations';
import user from './models/user.model';
import userInfo from './models/userInfo.model';
import post from './models/post.model';
import conversation from './models/conversation.model';
import message from './models/message.model';
import conversationParticipant from './models/conversationParticipants.model';

let postgresUri;

if (process.env.POSTGRES_URI) {
  postgresUri = process.env.POSTGRES_URI;
} else {
  console.error('POSTGRES_URI environmental variable is not set');
  process.exit(1);
}

const sequelize = new Sequelize(postgresUri, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const setUpDb = () => {
  user(sequelize);
  userInfo(sequelize); // TODO: really ugly solution need to find something better until its not too late
  post(sequelize);
  message(sequelize);
  conversation(sequelize);
  conversationParticipant(sequelize);
  setAssociations(sequelize);
};

(async () => {
  await sequelize.sync({ force: false });
})();

setUpDb();

export default sequelize;
