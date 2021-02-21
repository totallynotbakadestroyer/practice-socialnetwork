import { Sequelize } from 'sequelize';

export default (sequelize: Sequelize): void => {
  sequelize.define('conversationParticipant', {}, { modelName: 'conversationParticipants' });
};
