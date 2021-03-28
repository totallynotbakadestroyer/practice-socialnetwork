// eslint-disable-next-line import/prefer-default-export
export const generateNotification = (notification) => {
  switch (notification.type) {
    case 'MESSAGE_NOTIFICATION':
      return {
        ...notification,
        action: 'New Message',
      };
    default:
      break;
  }
};
