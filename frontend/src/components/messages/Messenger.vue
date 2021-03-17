<template>
  <div class="wrapper">
    <div class="fill-height">
      <chat-box :messages="messages" />
    </div>
    <v-footer absolute>
      <v-text-field
        v-model="message"
        placeholder="Start typing here"
        :append-icon="message ? 'mdi-send' : null"
        @click:append="send(message)"
        clearable
      />
    </v-footer>
  </div>
</template>

<script>
import ChatBox from '@/components/messages/ChatBox.vue';
import conversationService from '@/services/conversation';

export default {
  name: 'Messenger',
  components: { ChatBox },
  props: ['conversation'],
  data() {
    return {
      message: '',
      messages: [],
      page: 0,
    };
  },
  sockets: {
    newMessage(message) {
      console.log(message);
      this.messages.push(message);
    },
  },
  methods: {
    async send() {
      const message = { text: this.message };
      await conversationService.sendMessageToConvo(this.conversation.id, message);
      this.message = '';
    },
  },
  async beforeMount() {
    this.messages = await conversationService.getMessagesByConversationId(this.conversation.id);
    this.$socket.emit('joinConversationRoom', this.conversation.id);
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
</style>
