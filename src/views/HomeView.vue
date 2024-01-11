<!-- Home.vue -->
<template>
  <div class="home-container">
    <h1>User Management System <button @click="handleLogout">Logout</button></h1>

    <UserList />
  </div>
</template>

<script>
import UserList from "@/components/UserList";
import NetworkManager from "@/network";

export default {
  components: {
    UserList,
  },
  methods: {
    async handleLogout() {
      await NetworkManager.apiRequest("logout", {}, true, "application/json");
      window.location.reload();
    }
  },
};
</script>

<style scoped>
.home-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

button {
  margin-top: 20px;
}
</style>
