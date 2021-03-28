<template>
  <v-card
    @mouseleave="startTimeout"
    @mouseenter="stopTimeout"
    class="ml-auto mt-2 notification"
    outlined
    width="20%"
  >
    <v-card-title>
      {{ notification.action }}
    </v-card-title>
    <v-card-text class="d-flex align-center px-2">
      <div class="mr-4">
        <v-avatar size="64">
          <img :src="notification.trigger.avatar" alt="" />
        </v-avatar>
      </div>
      <div class="d-inline-block text-truncate">
        <p>
          {{ notification.trigger.firstName }}:
          {{ notification.content.data }}
        </p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ['notification'],
  name: 'Notification',
  data() {
    return {
      timer: false,
      timeout: null,
    };
  },
  mounted() {
    this.startTimeout();
  },
  methods: {
    startTimeout() {
      this.timer = true;
      this.timeout = setTimeout(this.destroy, 5000);
    },
    stopTimeout() {
      clearTimeout(this.timeout);
    },
    destroy() {
      this.$store.dispatch('deleteNotificationTimeout', this.notification.id);
    },
  },
};
</script>

<style scoped>
.notification {
  animation: fadeout 5s;
}

@keyframes fadeout {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.notification:hover {
  animation: none;
}
</style>
