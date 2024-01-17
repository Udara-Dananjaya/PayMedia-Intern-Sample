<!-- components/EditUser.vue -->

<template>
  <div>
    <h2>Edit User</h2>
    <form @submit.prevent="updateUser">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="editedUser.name" required>

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="editedUser.email" required>

      <label for="image">Image:</label>
      <input type="file" accept="image/*" @change="handleFileChange" id="image">

      <div class="border p-2 mt-3">
        <p>Preview Here:</p>
        <img :src="editedUser.img" class="img-fluid" width="100px" />
      </div>

      <button type="submit">Update User</button>
      <button type="button" @click="cancelEdit">Cancel</button>
    </form>
  </div>
</template>

<script>
import NetworkManager from "@/network";

export default {
  data() {
    return {
      editedUser: {
        id: null,
        name: "",
        email: "",
        img: null,
      },
    };
  },
  mounted() {
    // Access user ID from the route parameters
    const userId = this.$route.params.id;

    // Fetch user data by id using your API
    // Set the fetched data to `this.editedUser`
    this.fetchUserDataById(userId);
  },
  methods: {
    async fetchUserDataById(userId) {
  try {
    const response = await NetworkManager.apiRequest(`list/${userId}`, {}, true, "application/json");
    
    // Check if the response has a success property
    if (response.success) {
      // Assuming your user data is nested under the "data" property
      const userData = response.data.user;

      this.editedUser = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        img: userData.img ? `${process.env.VUE_APP_BASE_URL}${userData.img}` : null,
      };
    } else {
      console.error("Error fetching user data:", response);
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
},
    async updateUser() {
      try {
        const formData = new FormData();
        formData.append("id", this.editedUser.id);
        formData.append("name", this.editedUser.name);
        formData.append("email", this.editedUser.email);
        if (this.editedUser.img) {
          formData.append("img", this.editedUser.img);
        }

        await NetworkManager.apiRequest(
          `update/${this.editedUser.id}`,
          formData,
          true,
          "multipart/form-data"
        );

        this.$router.push({ name: 'UserList' }); // Navigate back to the user list
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
    cancelEdit() {
      this.$router.push({ name: 'UserList' }); // Navigate back to the user list
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      this.editedUser.img = file ? URL.createObjectURL(file) : null;
    },
  },
};
</script>

<style scoped>
/* Add your styling here */
</style>
