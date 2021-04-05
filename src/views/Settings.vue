<template>
  <div class="d-flex flex-column">
    <v-container ref="container" class="flex-grow-1 d-flex" fluid>
      <v-row class="flex-grow-1">
        <v-col class="d-flex" cols="9">
          <v-card outlined class="pa-6 flex-grow-1">
            <basic-info-settings
              @changedStatusChange="handleUnsavedChangesStatus"
              @updateProfile="updateProfile"
              ref="current"
              :current-fields="{
                firstName: this.user.userInfo.firstName,
                lastName: this.user.userInfo.lastName,
                birthday: new Date(this.user.userInfo.birthday).toISOString().substring(0, 10),
                gender: this.user.userInfo.gender,
              }"
              v-if="$route.query.section === 'profile_basic'"
            />
            <avatar-settings
              @changedStatusChange="handleUnsavedChangesStatus"
              :avatar="this.user.userInfo.avatar"
              v-else-if="$route.query.section === 'profile_avatar'"
              ref="current"
            />
            <contacts-settings
              @changedStatusChange="handleUnsavedChangesStatus"
              @updateProfile="updateProfile"
              :current-fields="{ ...user.userInfo.contacts }"
              v-else-if="$route.query.section === 'profile_contacts'"
              ref="current"
            />
            <work-settings
              @changedStatusChange="handleUnsavedChangesStatus"
              @updateProfile="updateProfile"
              :current-fields="{ ...user.userInfo.work }"
              v-else-if="$route.query.section === 'profile_work'"
              ref="current"
            />
            <user-settings
              @changedStatusChange="handleUnsavedChangesStatus"
              :current-fields="{ ...user.userInfo.contacts }"
              v-else-if="$route.query.section === 'user_general'"
              ref="current"
            />
          </v-card>
        </v-col>
        <v-col cols="3">
          <settings-menu />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';
import SettingsMenu from '../components/Settings/SettingsMenu.vue';
import BasicInfoSettings from '../components/Settings/BasicInfoSettings.vue';
import AvatarSettings from '../components/Settings/AvatarSettings.vue';
import ContactsSettings from '../components/Settings/ContactsSettings.vue';
import WorkSettings from '../components/Settings/WorkSettings.vue';
import UserSettings from '../components/Settings/UserSettings.vue';
import SaveChangesDialog from '../components/Settings/SaveChangesDialog.vue';
import vuetify from '../plugins/vuetify';
import profileService from '../services/profile';

let ComponentClass;
let instance;

export default {
  name: 'Settings',
  components: {
    UserSettings,
    WorkSettings,
    ContactsSettings,
    AvatarSettings,
    BasicInfoSettings,
    SettingsMenu,
  },
  beforeRouteUpdate(to, from, next) {
    // TODO: not sure if components created programmatically are something good, might take a look at better approach
    if (this.unsavedChangesPopup) return;
    if (!this.unsavedChanges) return next();
    this.unsavedChangesPopup = true;
    ComponentClass = Vue.extend(SaveChangesDialog);
    instance = new ComponentClass({ vuetify, propsData: { next } });
    instance.$on('closePopup', () => {
      this.closePopup();
    });
    instance.$on('discardChanges', () => {
      this.unsavedChanges = false;
    });
    instance.$on('saveChanges', async () => {
      await this.$refs.current.saveChanges();
      next();
    });
    instance.$mount();
    this.$refs.container.appendChild(instance.$el);
  },
  data() {
    return {
      unsavedChangesPopup: false,
      unsavedChanges: false,
      user: {},
    };
  },
  methods: {
    moment() {
      return moment();
    },
    updateProfile(data) {
      this.user = data;
      this.$store.dispatch('updateUserInfo', data.userInfo);
    },
    closePopup() {
      ComponentClass = null;
      instance = null;
      this.unsavedChangesPopup = false;
    },
    handleUnsavedChangesStatus(value) {
      console.log(value);
      this.unsavedChanges = value;
    },
  },
  async beforeMount() {
    this.user = await profileService.getUser();
  },
};
</script>

<style scoped></style>
