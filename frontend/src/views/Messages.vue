<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height">
      <v-col cols="9">
        <v-card outlined class="pa-2 fill-height d-flex justify-center align-center">
          <h1 v-if="!$route.query.recId">
            Select contact you want to start chat with
          </h1>
          <messenger :key="$route.fullPath" class="overflow-y-auto"
                     :rec-id="$route.query.id" v-else/>
        </v-card>
      </v-col>
      <v-col cols="3">
        <v-card outlined class="mx-auto">
          <v-list>
            <v-card-title>
              Contacts:
            </v-card-title>
            <v-list-item-group v-model="model" color="indigo">
              <last-message v-for="(conversation, id) in conversations" :key="id"
                            :interlocutor="getInterlocutor(conversation)"/>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import LastMessage from '@/components/messages/LastMessage.vue';
import Messenger from '@/components/messages/Messenger.vue';
import axios from 'axios';

export default {
  name: 'Messages',
  components: { Messenger, LastMessage },
  data() {
    return {
      model: '',
      conversations: [],
    };
  },
  methods: {
    getInterlocutor(conversation) {
      return (conversation.userOne.id === this.$store.getters.getUserId)
        ? conversation.userTwo : conversation.userOne;
    },
  },
  mounted() {
    axios({
      method: 'get',
      url: '/api/conversations',
    }).then((response) => {
      console.log(response.data.content);
      this.conversations.push(...response.data.content);
    }).catch((error) => {
      console.log(error);
    });
  },
};
</script>

<style scoped>

body::-webkit-scrollbar {
  display: none;
}

</style>
