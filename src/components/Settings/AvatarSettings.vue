<template>
  <v-col cols="12">
    <div class="d-flex align-center flex-column justify-space-around">
      <v-avatar size="208">
        <img src="/images/placeholderavatar.png" />
      </v-avatar>
      <div class="flex-grow-1">
        <v-btn block class="mt-4"> Select new avatar </v-btn>
      </div>
    </div>
  </v-col>
</template>

<script>
export default {
  name: 'AvatarSettings',
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
