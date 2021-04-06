<template>
  <v-row>
    <v-col cols="12">
      <div class="d-flex align-center flex-column justify-space-around">
        <v-avatar size="208">
          <img :src="this.newAvatarURL ? this.newAvatarURL : this.avatar" />
        </v-avatar>
        <div class="flex-grow-1">
          <input
            @change="processFile($event)"
            type="file"
            ref="file"
            name="avatar"
            style="display: none"
          />
          <v-btn @click="$refs.file.click()" block class="mt-4"> Select new avatar </v-btn>
        </div>
      </div>
    </v-col>
    <v-card-actions class="ml-auto">
      <v-btn @click="revertChanges">Revert changes</v-btn>
      <v-btn @click="saveChanges">Save</v-btn>
    </v-card-actions>
  </v-row>
</template>

<script>
import profileService from '../../services/profile';

export default {
  name: 'AvatarSettings',
  props: ['avatar'],
  data() {
    return {
      newAvatarFile: '',
      newAvatarURL: '',
    };
  },
  methods: {
    processFile(event) {
      this.newAvatarFile = event.target.files[0];
      this.newAvatarURL = URL.createObjectURL(event.target.files[0]);
    },
    revertChanges() {
      this.newAvatarURL = '';
      this.newAvatarFile = '';
    },
    async saveChanges() {
      const formData = new FormData();
      formData.append('avatar', this.newAvatarFile);
      const updatedProfile = await profileService.updateUser(formData);
      this.$emit('updateProfile', updatedProfile);
    },
  },
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
