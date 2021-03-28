<template>
  <v-dialog v-model="dialog" width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn :class="className" color="success" dark v-bind="attrs" v-on="on"> Send message </v-btn>
    </template>
    <v-card>
      <v-card-title class="headline green accent-4">
        <h5>New message</h5>
        <v-spacer />
        <h6>Open full dialog with {{ user.firstName }}</h6>
      </v-card-title>
      <div class="pa-6">
        <div class="d-flex mb-5">
          <v-avatar size="64">
            <img :src="user.avatar" alt="avatar" />
          </v-avatar>
          <div class="flex-column ml-3 align-self-center">
            <h5>{{ user.firstName }} {{ user.lastName }}</h5>
            <!-- todo: add ability to show current status (online/offline last seen) -->
            <h5 class="caption grey--text">last seen 2000 years ago at 6:66 am</h5>
          </div>
        </div>
        <v-textarea filled placeholder="Start typing here" height="250" no-resize> </v-textarea>
        <div class="d-flex">
          <v-btn class="ml-auto">Send</v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  name: 'SendMessageProfileButton',
  props: { user: Object, className: String },
};
</script>

<style scoped></style>
