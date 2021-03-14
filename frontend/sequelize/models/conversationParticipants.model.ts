import { DataTypes, Sequelize } from 'sequelize';

export default (sequelize: Sequelize): void => {
  sequelize.define(
    'conversationParticipant',
    {
      userId: {
        type: DataTypes.NUMBER,
        primaryKey: true,
      },
      conversationId: {
        type: DataTypes.NUMBER,
        primaryKey: true,
      },
    },
    { modelName: 'conversationParticipants' }
  );
};
