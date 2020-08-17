<template>
  <v-app>
    <v-container fill-height>
      <v-row
        justify="center"
        align="center">
        <v-col
          sm="3"
        >
          <h1 class="green--text">Vuealize</h1>
          <!-- eslint-disable max-len -->
          <p><span class="green--text">Vuealize</span> is just a simple social network which was made as a practice
            project using <a target="_blank"
                             href="https://spring.io/">Spring</a>
            and
            <a target="_blank" href="https://vuejs.org/">Vue</a></p>
        </v-col>
        <v-col
          sm="4"
          offset-sm="2">
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
                color="success"

              ></v-text-field>
              <v-btn
                color="accent"
                block
              >Login!
              </v-btn>
              <div class="ma-5">
                <a href="/account/restore">
                  Forgot your password?
                </a>
              </div>
              <hr>
              <v-dialog
                v-model="dialog"
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
        </v-col>
      </v-row>
    </v-container>
    <v-footer
      absolute>
      <h3 class="ml-auto">
        {{ new Date().getFullYear() }} - <strong>Vuealize</strong>
      </h3>
    </v-footer>
  </v-app>
</template>

<script>

import Register from '@/components/Register.vue';

export default {
  name: 'Home',
  components: {
    Register,
  },
};
</script>
