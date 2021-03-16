<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height">
      <v-col cols="9">
        <v-card outlined class="pa-2 fill-height d-flex justify-center align-center">
          <h1 v-if="!currentConversation">Select contact you want to start chat with</h1>
          <messenger class="overflow-y-auto" :conversation="currentConversation" v-else />
        </v-card>
      </v-col>
      <v-col cols="3"
        ><contacts-box
          :conversations="conversations"
          @conversation-change="handleConversationChange"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Messenger from '@/components/messages/Messenger.vue';
import conversationService from '@/services/conversation';
import ContactsBox from '@/components/messages/ContactsBox.vue';

export default {
  name: 'Messages',
  components: { ContactsBox, Messenger },
  data() {
    return {
      conversations: [],
      currentConversation: null,
    };
  },
  async mounted() {
    const conversations = await conversationService.getUserConversations();
    console.log(conversations);
    this.conversations = [...conversations];
  },
  methods: {
    handleConversationChange(model) {
      this.currentConversation = model;
    },
  },
};
</script>

<style scoped>
body::-webkit-scrollbar {
  display: none;
}
</style>
