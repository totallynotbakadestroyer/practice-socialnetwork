export default {
  name: 'notification',
  state: {
    notifications: [],
    notificationsTemp: [],
    friendRequestsNotifications: [],
    messageNotifications: [],
  },
  mutations: {
    SET_NOTIFICATIONS(state, notifications) {
      state.notifications = notifications;
    },
    ADD_NOTIFICATION(state, notification) {
      state.notifications.push(notification);
    },
    ADD_NOTIFICATION_TEMP(state, notification) {
      state.notificationsTemp.push(notification);
    },
    ADD_MESSAGE_NOTIFICATION(state, notification) {
      state.messageNotifications.push(notification);
    },
    ADD_FRIEND_REQUEST_NOTIFICATION(state, notification) {
      state.friendRequestsNotifications.push(notification);
    },
    DELETE_NOTIFICATION_TEMP(state, id) {
      const index = state.notificationsTemp.findIndex((x) => x.id === id);
      if (index !== -1) {
        state.notificationsTemp.splice(index, 1);
      }
    },
  },
  actions: {
    deleteNotificationTimeout({ commit }, id) {
      console.log(id);
      commit('DELETE_NOTIFICATION_TEMP', id);
    },
    addNewNotification({ commit }, notification) {
      commit('ADD_NOTIFICATION_TEMP', notification);
      if (notification.type === 'MESSAGE_NOTIFICATION') {
        commit('ADD_MESSAGE_NOTIFICATION', notification);
      } else if (notification.type === 'FRIEND_REQUEST_NOTIFICATION') {
        commit('ADD_FRIEND_REQUEST_NOTIFICATION', notification);
      } else {
        commit('ADD_NOTIFICATION', notification);
      }
    },
  },
  getters: {
    getNotifications: (state) => state.notificationsTemp,
    getNotificationsCount: (state) => state.notifications,
  },
};
