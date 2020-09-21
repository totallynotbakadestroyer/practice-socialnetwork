<template>
  <v-card>
    <v-card-title class="headline green accent-4">
      <h5>New message</h5>
      <v-spacer/>
      <h6>Open full dialog with {{ user.firstName }}</h6>
    </v-card-title>
    <div class="pa-6">
      <div class="d-flex mb-5">
        <v-avatar size="64">
          <img
            src="https://sun1-19.userapi.com/impf/c631126/v631126284/1fee8/uM5B9bPqpv0.jpg?size=50x0&quality=88&crop=819,0,1440,1440&sign=a2e77c73b90cc2ca22bff37009b563b0&ava=1"
            alt="">
        </v-avatar>
        <div class="flex-column ml-3 align-self-center">
          <h5>{{ user.firstName }} {{ user.lastName }}</h5>
          <!-- todo: add ability to show current status (online/offline last seen) -->
          <h5
            class="caption grey--text">
            last seen 2000 years ago at 6:66 am
          </h5>
        </div>
      </div>
      <v-textarea filled placeholder="Start typing here" height="250" no-resize>
      </v-textarea>
      <div class="d-flex">
        <v-btn class="ml-auto">Send</v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'SendMessageProfile',
  props: ['user'],
};
</script>

<style scoped>

</style>
