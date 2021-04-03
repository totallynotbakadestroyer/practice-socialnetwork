<template>
  <v-dialog @input="closePopup" v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="headline"> Leave page? </v-card-title>
      <v-card-text>Are you sure you want to leave? You have unsaved changes!.</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="closePopup"> Close </v-btn>
        <v-btn color="green darken-1" text @click="discardChanges"> Discard </v-btn>
        <v-btn color="green darken-1" text @click="saveChanges"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['next'],
  name: 'SaveChangesDialog',
  data() {
    return {
      dialog: true,
    };
  },
  methods: {
    closePopup() {
      this.dialog = false;
      this.$emit('closePopup');
      setTimeout(() => {
        this.$destroy();
        this.$el.parentNode.removeChild(this.$el);
      }, 400);
    },
    discardChanges() {
      this.next();
      this.$emit('discardChanges');
      this.closePopup();
    },
    saveChanges() {
      this.$emit('saveChanges');
      this.closePopup();
    },
  },
};
</script>

<style scoped></style>
