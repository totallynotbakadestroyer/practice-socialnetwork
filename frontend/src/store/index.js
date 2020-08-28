import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as jwtDecode from 'jwt-decode';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    userId: 0,
    status: '',
  },
  mutations: {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, authentificationInfo) {
      state.status = 'logged';
      state.token = authentificationInfo.token;
      state.userId = authentificationInfo.userId;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
    },
  },
  actions: {
    login({ commit }, loginData) {
      return new Promise((resolve, reject) => {
        commit('auth_request');
        axios({ url: '/login', data: loginData, method: 'POST' })
          .then((response) => {
            let token = response.headers.authorization;
            token = token.substring(token.lastIndexOf(' ') + 1);
            localStorage.setItem('token', token);
            const userId = jwtDecode(token).id;
            commit('auth_success', { token, userId });
            resolve(response);
          })
          .catch((error) => {
            console.log(error);
            commit('auth_error');
            reject(error);
          });
      });
    },
  },
  modules: {},
  getters: {
    getUserId: (state) => state.userId,
  },
});
