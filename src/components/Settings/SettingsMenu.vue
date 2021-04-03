<template>
  <v-card>
    <v-list>
      <v-list-item
        v-for="([title, section, disabled], i) in userSettings"
        :disabled="disabled"
        :key="i"
        :to="{ query: { section } }"
        exact
      >
        <v-list-item-title v-text="title"></v-list-item-title>
      </v-list-item>
      <v-list-group no-action>
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Profile settings</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="([title, section], i) in profileSettings"
          :key="i"
          :to="{ query: { section } }"
          exact
        >
          <v-list-item-title v-text="title"></v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'SettingsMenu',
  data() {
    return {
      userSettings: [['General', 'user_general']],
      profileSettings: [
        ['Basic Info', 'profile_basic'],
        ['Change Avatar', 'profile_avatar'],
        ['Contact Info', 'profile_contacts'],
        ['Work Info', 'profile_work'],
      ],
    };
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
