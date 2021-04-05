<template>
  <v-row>
    <div style="width: 100%" class="mb-4">
      <v-col cols="12">
        <v-text-field :success="isChanged('country')" v-model="country" outlined label="Country" />
      </v-col>
      <v-col cols="12">
        <v-text-field :success="isChanged('city')" v-model="city" outlined label="City" />
      </v-col>
      <v-divider />
    </div>
    <v-col cols="12">
      <v-text-field
        :success="isChanged('phoneNumber')"
        v-model="phoneNumber"
        outlined
        label="Phone Number"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        :success="isChanged('discordTag')"
        v-model="discordTag"
        outlined
        label="Discord Tag"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        :success="isChanged('instagram')"
        v-model="instagram"
        outlined
        label="Instagram link"
      />
    </v-col>
    <v-col cols="12">
      <v-text-field
        :success="isChanged('website')"
        v-model="website"
        outlined
        label="Personal Website Link"
      />
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
  name: 'ContactsSettings.vue',
  props: ['currentFields'],
  data() {
    return {
      country: this.currentFields.country,
      city: this.currentFields.city,
      phoneNumber: this.currentFields.phoneNumber,
      discordTag: this.currentFields.discordTag,
      instagram: this.currentFields.instagram,
      website: this.currentFields.website,
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
            contacts: {
              country: this.country,
              city: this.city,
              phoneNumber: this.phoneNumber,
              discordTag: this.discordTag,
              instagram: this.instagram,
              website: this.website,
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
