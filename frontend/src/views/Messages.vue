<template>
  <div class="d-flex flex-column fill-height">
    <v-container class="flex-grow-1 d-flex" fluid>
      <v-row class="flex-grow-1">
        <v-col class="d-flex" cols="9">
          <v-card
            outlined
            class="message__container pa-2 flex-grow-1 d-flex justify-center align-center"
          >
            <h1 v-if="!currentConversation">Select contact you want to start chat with</h1>
            <messenger
              class="overflow-y-auto flex-grow-1 d-flex"
              :conversation="currentConversation"
              v-else
            />
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
  </div>
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
main {
  display: flex;
}

.message__container {
  height: 97vh;
}
</style>
