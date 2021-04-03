<template>
  <v-row>
    <v-col cols="12">
      <v-text-field label="Email" />
    </v-col>
    <v-col cols="12">
      <v-text-field label="Password" type="password" placeholder="*******" />
    </v-col>
    <div style="width: 100%">
      <v-btn block color="error"> you can delete your profile by pressing this button</v-btn>
    </div>
  </v-row>
</template>

<script>
export default {
  name: 'UserSettings',
};
</script>

<style scoped lang="scss">
.v-input::v-deep .success--text {
  color: #ff9900 !important;
}
.v-application .success--text {
  color: #ff9900 !important;
  caret-color: #ff9900;
}
</style>
