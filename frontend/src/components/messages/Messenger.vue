<template>
  <div class="wrapper">
    <div class="fill-height">
      <chat-box :messages="messages"/>
    </div>
    <v-footer absolute>
      <v-text-field
        v-model="message"
        placeholder="Start typing here"
        :append-icon="message ? 'mdi-send' : null"
        @click:append="send(message)"
        clearable/>
    </v-footer>
  </div>
</template>

<script>
import ChatBox from '@/components/messages/ChatBox.vue';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import axios from 'axios';

export default {
  name: 'Messenger',
  components: { ChatBox },
  data() {
    return {
      message: '',
      messages: [],
      page: 0,
    };
  },
  methods: {
    send() {
      console.log(`Send message:${this.message}`);
      const msg = { text: this.message };
      console.log(JSON.stringify(msg));
      this.stompClient.send(`/app/hello/${this.$route.query.recId}`, {}, JSON.stringify(msg));
      this.message = '';
    },
  },
  mounted() {
    this.$nextTick(() => {
      const socket = new SockJS('/message');
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect(
        {},
        (frame) => {
          console.log(`Connected: ${frame}`);

          this.stompClient.subscribe('/topic/chat', (val) => {
            console.log(val);
            console.log(JSON.parse(val.body));
            this.messages.push(JSON.parse(val.body));
          });
        },
      );
      axios({
        method: 'get',
        url: '/api/messages',
        params: {
          page: this.page,
          recId: this.$route.query.recId,
        },
      }).then((response) => {
        console.log(response);
        this.messages.push(...response.data.content);
      }).catch((error) => {
        console.log(error);
      });
    });
  },

  beforeDestroy() {
    this.stompClient.disconnect();
  },
};

</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
</style>
