<template>
          <v-card
            class="d-flex flex-sm-column text-center pa-6 rounded-xl"
          >
            <v-form>
              <v-text-field
                label="Email"
                color="success"
                v-model="email">
              </v-text-field>
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
                color="success"

              ></v-text-field>
              <v-alert transition="scale-transition" :value="wrongCredentials" color="red" dense>
                Wrong email/password
              </v-alert>
              <v-btn
                color="accent"
                block
                @click="login()"
              >Login!
              </v-btn>
              <div class="ma-5">
                <a href="/account/restore">
                  Forgot your password?
                </a>
              </div>
              <hr>
              <v-dialog
                width="500"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    class="mt-6"
                    color="success"
                    dark
                    v-bind="attrs"
                    v-on="on"
                  >
                    Create new account!
                  </v-btn>
                </template>
                <register/>
              </v-dialog>
            </v-form>
          </v-card>
</template>

<script>

import Register from '@/components/RegisterForm.vue';

export default {
  name: 'login',
  components: {
    Register,
  },
  data() {
    return {
      email: '',
      password: '',
      wrongCredentials: false,
    };
  },
  methods: {
    login() {
      this.wrongCredentials = false;
      const { email } = this;
      const { password } = this;
      this.$store.dispatch('login', { email, password }).then(() => {
        this.$router.push(`/id${this.$store.getters.getUserId}`);
      }).catch(() => {
        this.wrongCredentials = true;
      });
    },
  },
};
</script>
