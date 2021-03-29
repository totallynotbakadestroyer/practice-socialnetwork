<template>
  <v-app>
    <v-container fill-height>
      <v-row justify="center" align="center">
        <v-col sm="4">
          <h1 class="green--text">Vuealize</h1>
          <p>
            <span class="green--text">Vuealize</span>
            is just a simple social network which was made as a practice project using
            <a target="_blank" href="https://nodejs.org/">Node.js</a>
            and
            <a target="_blank" href="https://vuejs.org/">Vue</a>
          </p>
        </v-col>
        <v-col offset-sm="1" sm="4">
          <LoginForm />
        </v-col>
      </v-row>
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
