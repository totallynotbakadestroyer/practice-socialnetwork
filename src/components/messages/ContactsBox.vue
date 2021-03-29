<template>
  <v-card outlined class="mx-auto">
    <v-list>
      <v-card-title> Contacts: </v-card-title>
      <v-list-item-group
        @change="handleConversationChange"
        v-model="currentConversation"
        color="indigo"
      >
        <last-message
          v-for="(conversation, id) in conversations"
          :key="id"
          :interlocutor="getInterlocutor(conversation)"
          :conversation="conversation"
        />
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
import LastMessage from './LastMessage.vue';

export default {
  props: ['conversations'],
  name: 'ContactsBox',
  components: { LastMessage },
  methods: {
    getInterlocutor(conversation) {
      if (conversation.participants.length === 2) {
        return conversation.participants.find((x) => x.userId !== this.$store.state.id).userInfo;
      }
    },
    handleConversationChange(conversation) {
      this.$emit('conversation-change', conversation);
    },
  },
  data() {
    return {
      currentConversation: '',
    };
  },
};
</script>

<style scoped></style>
