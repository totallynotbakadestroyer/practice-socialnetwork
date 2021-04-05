import Vue from 'vue';
import Vuex from 'vuex';
import notification from './notifications';
import router from '../router/index';
import authService from '../services/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: '',
    token: '',
    userInfo: '',
    status: '',
  },
  mutations: {
    authRequest(state) {
      state.status = 'loading';
    },
    authSuccess(state, authenticationInfo) {
      state.status = 'logged';
      state.id = authenticationInfo.id;
      state.token = authenticationInfo.token;
      state.userInfo = authenticationInfo.userInfo;
    },
    authError(state) {
      state.status = 'error';
    },
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    logout(state) {
      state.id = '';
      state.status = '';
      state.token = '';
      state.userInfo = '';
      localStorage.removeItem('token');
    },
  },
  actions: {
    async login({ commit }, loginData) {
      commit('authRequest');
      const user = await authService.signIn(loginData);
      const token = user.headers.authorization.split(' ')[1];
      const authInfo = { ...user.data, token };
      commit('authSuccess', authInfo);
    },
    async logout({ commit }) {
      commit('logout');
      await router.push('/');
    },
    updateUserInfo({ commit }, userInfo) {
      commit('updateUserInfo', userInfo);
    },
  },
  modules: {
    notification,
  },
  getters: {
    getFullName: (state) => `${state.userInfo.firstName}  ${state.userInfo.lastName}`,
  },
});
