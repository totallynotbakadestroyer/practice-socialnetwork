<template>
  <v-dialog v-model="deleteDialog" max-width="390">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="error" v-bind="attrs" v-on="on"> Delete from friends</v-btn>
    </template>
    <v-card>
      <v-card-title class="headline"> Remove from friends </v-card-title>
      <v-card-text>
        Are you sure you want to delete {{ firstName }} from your friend list?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="deleteDialog = false"> Cancel </v-btn>
        <v-btn text @click="confirmDeletion"> Delete </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['firstName'],
  name: 'DeleteFriendButton',
  data() {
    return {
      deleteDialog: false,
    };
  },
  methods: {
    confirmDeletion() {
      this.$emit('confirmDeletion');
      this.deleteDialog = false;
    },
  },
};
</script>

<style scoped></style>
