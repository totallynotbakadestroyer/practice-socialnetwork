import Vue from 'vue';
import Vuelidate from 'vuelidate';
import SocketIO from 'socket.io-client';
import Axios from 'axios';
import VueSocketIO from 'vue-socket.io';
import InfiniteLoading from 'vue-infinite-loading';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(InfiniteLoading);

const socketConnection = SocketIO('http://localhost:8889', { autoConnect: false });

Vue.use(
  new VueSocketIO({
    debug: true,
    connection: socketConnection,
  })
);

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token');
if (token) {
  Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`;
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
