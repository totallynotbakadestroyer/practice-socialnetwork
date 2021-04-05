<template>
  <v-card>
    <v-card-title class="headline green accent-4"> Sign up </v-card-title>

    <v-card-actions class="pa-4">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="firstName"
            label="First name"
            outlined
            :error-messages="firstNameErrors"
            @input="$v.firstName.$touch()"
            @blur="$v.firstName.$touch()"
            color="green"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="lastName"
            label="Last name"
            :error-messages="lastNameErrors"
            color="green"
            outlined
            @input="$v.lastName.$touch()"
            @blur="$v.lastName.$touch()"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="12">
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            type="email"
            label="Email"
            outlined
            color="green"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Password"
            v-model="password"
            :error-messages="passwordErrors"
            type="password"
            color="green"
            outlined
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            label="Password confirm"
            v-model="passwordConfirm"
            type="password"
            :error-messages="passwordConfirmErrors"
            color="green"
            outlined
            @input="$v.passwordConfirm.$touch()"
            @blur="$v.passwordConfirm.$touch()"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12">
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            :return-value.sync="birthday"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="birthday"
                label="Date of birth"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="birthday" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(birthday)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-card-actions>

    <v-divider></v-divider>

    <v-card-actions class="pa-4">
      <v-spacer></v-spacer>
      <v-btn color="accent" @click="submitForm()"> Sign up! </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
import axios from 'axios';

export default {
  validations: {
    firstName: { required },
    email: { required, email },
    select: { required },
    lastName: { required },
    password: { required, minLength: minLength(8) },
    passwordConfirm: { sameAsPassword: sameAs('password') },
  },
  data() {
    return {
      birthday: new Date().toISOString().substr(0, 10),
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirm: '',
    };
  },
  /*eslint-disable */
  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push('Email is required.');
      !this.$v.email.email && errors.push('This is not a proper email');
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) {
        return errors;
      }
      !this.$v.firstName.required && errors.push('First name is required.');
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push('Last name is required.');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('Password is required.');
      !this.$v.password.minLength && errors.push('Password must contain at least 8 characters');
      return errors;
    },
    passwordConfirmErrors() {
      const errors = [];
      if (!this.$v.passwordConfirm.$dirty) return errors;
      !this.$v.passwordConfirm.sameAsPassword && errors.push('Passwords must be identical');
      return errors;
    },
    /* eslint-enable */
  },
  methods: {
    submitForm() {
      if (this.$v.invalid) {
        console.log('something went wrong my dudes.....');
      } else {
        axios({
          method: 'post',
          url: '/api/auth/signup',
          data: {
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            password: this.password,
            birthday: this.birthday,
          },
        }).then(
          () => {
            this.$emit('closeModal');
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
  },
};
</script>

<style scoped></style>
