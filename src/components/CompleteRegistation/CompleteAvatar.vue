<template>
  <v-row justify="center">
    <v-col cols="12">
      <v-card-subtitle class="text-center">
        Consider uploading your avatar so your friends and colleagues can easily find you!
      </v-card-subtitle>
      <v-divider />
    </v-col>
    <!--TODO: add upload image support -->
    <v-col class="d-flex justify-center" cols="12">
      <div>
        <v-avatar color="blue" size="96">
          <v-icon x-large dark>mdi-account-circle</v-icon>
        </v-avatar>
        <v-btn class="text-center mt-6" block>Upload</v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CompleteAvatar',
};
</script>

<style scoped></style>
