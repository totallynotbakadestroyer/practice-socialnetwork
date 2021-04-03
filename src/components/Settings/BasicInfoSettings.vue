<template>
  <v-row ref="container">
    <v-col cols="6">
      <v-text-field
        :success="isChanged('firstName')"
        v-model="firstName"
        outlined
        label="First name"
      />
    </v-col>
    <v-col cols="6">
      <v-text-field
        :success="isChanged('lastName')"
        v-model="lastName"
        outlined
        label="Last name"
      />
    </v-col>
    <v-col cols="12">
      <v-select :success="isChanged('gender')" v-model="gender" outlined label="Gender" />
    </v-col>
    <v-col cols="12">
      <v-dialog ref="dialog" v-model="birthdayModal" :return-value.sync="birthday" width="290px">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            :success="isChanged('birthday')"
            v-model="birthday"
            outlined
            label="Birthday"
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="birthday" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
          <v-btn text color="primary" @click="$refs.dialog.save(birthday)"> OK </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
    <v-card-actions class="ml-auto">
      <v-btn>cool</v-btn>
    </v-card-actions>
  </v-row>
</template>

<script>
export default {
  name: 'BasicInfoSettings',
  props: ['currentFields'],
  data() {
    return {
      birthdayModal: false,
      firstName: this.currentFields.firstName,
      lastName: this.currentFields.lastName,
      gender: this.currentFields.gender,
      birthday: this.currentFields.birthday,
    };
  },
  computed: {
    changed() {
      return Object.entries(this.currentFields).some(([key, value]) => this[key] !== value);
    },
  },
  methods: {
    saveChanges() {
      console.log('saved');
    },
    isChanged(fieldName) {
      return this.currentFields[fieldName] !== this[fieldName];
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
