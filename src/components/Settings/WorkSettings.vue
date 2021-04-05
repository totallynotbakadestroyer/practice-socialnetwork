<template>
  <v-row>
    <v-col cols="12">
      <v-text-field
        :success="isChanged('companyName')"
        v-model="companyName"
        outlined
        label="Company name"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field :success="isChanged('country')" v-model="country" outlined label="Country" />
    </v-col>
    <v-col cols="12">
      <v-text-field :success="isChanged('city')" v-model="city" outlined label="City" />
    </v-col>
    <v-col cols="12">
      <v-text-field :success="isChanged('position')" v-model="position" outlined label="Position" />
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
  name: 'WorkSettings',
  props: ['currentFields'],
  data() {
    return {
      companyName: this.currentFields.companyName,
      country: this.currentFields.country,
      city: this.currentFields.city,
      position: this.currentFields.position,
    };
  },
  computed: {
    changed() {
      return Object.entries(this.currentFields).some(([key, value]) => this[key] !== value);
    },
  },
  methods: {
    isChanged(fieldName) {
      return this.currentFields[fieldName] !== this[fieldName];
    },
    async saveChanges() {
      const payload = {
        user: {
          userInfo: {
            work: {
              companyName: this.companyName,
              country: this.country,
              city: this.city,
              position: this.position,
            },
          },
        },
      };
      const updatedProfile = await profileService.updateUser(payload);
      this.$emit('updateProfile', updatedProfile);
    },
    revertChanges() {
      Object.entries(this.currentFields).forEach(([key, value]) => {
        this[key] = value;
      });
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
