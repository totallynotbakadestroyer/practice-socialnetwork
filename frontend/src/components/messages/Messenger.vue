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
  methods: {
    async send() {
      const message = { text: this.message };
      const newMessage = await conversationService.sendMessageToConvo(
        this.conversation.id,
        message
      );
      this.message = '';
      console.log(newMessage);
      this.messages.push(newMessage);
    },
  },
  async beforeMount() {
    this.messages = await conversationService.getMessagesByConversationId(this.conversation.id);
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
</style>
