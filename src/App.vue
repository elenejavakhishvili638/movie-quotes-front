<script setup>
import {onMounted, computed} from 'vue'
import { useUserStore } from './stores/user';
import instantiatePusher from './helpers/instantiatePusher';
import { useNotificationStore } from './stores/notification';

const userStore = useUserStore()
const notificationStore = useNotificationStore()
const notifications = computed(() => notificationStore.$state.notifications)

onMounted(async() => {
  instantiatePusher()
  const response =  await userStore.fetchUserData(); 
  if(response.data.data) {
    window.Echo.private(`notifications.${response.data.data.id}`).listen(
      "NotificationReceived",
      (data) => {
        notifications.value.push(data.notifications)
      }
    );
  }
});

</script>

<template>
  <div class="w-screen">
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.route-enter-from {
  opacity: 0;
}

.route-leave-to {
  opacity: 0;
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
}
</style>
