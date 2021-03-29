<template>
  <v-app>
    <v-container fill-height>
      <v-row justify="center" align="center">
        <v-col sm="5">
          <h1 class="green--text text-center mb-2">Vuealize login</h1>
          <LoginForm></LoginForm>
        </v-col>
      </v-row>
      <v-footer absolute>
        <h3 class="ml-auto">{{ new Date().getFullYear() }} - <strong>Vuealize</strong></h3>
      </v-footer>
    </v-container>
  </v-app>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
};
</script>
