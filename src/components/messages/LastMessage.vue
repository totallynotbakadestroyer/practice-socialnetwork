<template>
  <v-list-item exact class="py-2 align-self-center" :value="conversation">
    <div class="d-flex message">
      <span class="message_avatar align-self-center">
        <v-avatar size="60">
          <img :src="interlocutor.avatar" />
        </v-avatar>
      </span>
      <div class="message_body d-flex flex-column ml-3 align-self-center">
        <div class="message_body_name d-flex justify-space-between">
          <span>{{ interlocutor.firstName }} {{ interlocutor.lastName }}</span>
          <span>{{ interlocutor.time }}</span>
        </div>
        <div>
          <span>{{ interlocutor.message }}</span>
        </div>
      </div>
    </div>
  </v-list-item>
</template>

<script>
export default {
  props: ['interlocutor', 'conversation'],
  name: 'LastMessage',
};
</script>

<style scoped>
.message {
  width: 100%;
  height: 100%;
}

.message_body {
  width: 100%;
}
</style>
