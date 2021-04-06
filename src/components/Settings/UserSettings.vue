<template>
  <v-row>
    <v-col cols="12">
      <v-text-field :success="isChanged('email')" v-model="newEmail" label="Email" />
    </v-col>
    <v-col cols="12">
      <v-text-field
        label="Password"
        :success="isChanged('password')"
        v-model="newPassword"
        :type="newPassword ? 'password' : 'text'"
        placeholder="<hidden>"
      />
    </v-col>
    <v-card-actions class="ml-auto mb-4">
      <v-btn @click="revertChanges">Revert changes</v-btn>
      <v-btn @click="saveChanges">Save</v-btn>
    </v-card-actions>
    <div style="width: 100%">
      <v-divider />
      <v-btn class="mt-8" block color="error">
        you can delete your profile by pressing this button</v-btn
      >
    </div>
  </v-row>
</template>

<script>
import profileService from '../../services/profile';

export default {
  name: 'UserSettings',
  props: ['email'],
  data() {
    return {
      newEmail: this.email,
      newPassword: '',
    };
  },
  computed: {
    changed() {
      return !!this.newPassword || this.newEmail !== this.email;
    },
  },
  methods: {
    async saveChanges() {
      const payload = {
        user: {
          email: this.newEmail,
          password: this.newPassword,
        },
      };
      if (!this.newPassword) delete payload.user.password;
      const updatedProfile = await profileService.updateUser(payload);
      this.newPassword = '';
      this.$emit('updateProfile', updatedProfile);
    },
    revertChanges() {
      this.newEmail = this.email;
      this.newPassword = '';
    },
    isChanged(fieldName) {
      if (fieldName === 'password') {
        return !!this.newPassword;
      }
      return this.newEmail !== this.email;
    },
  },
  watch: {
    changed(value) {
      this.$emit('changedStatusChange', value);
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
