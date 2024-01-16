<!-- components/UserList.vue -->

<template>
  <div class="user-list">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <img v-if="user.img" :src="user.img" alt="User Image">
            <span v-else>-</span>
          </td>
          <td>
            <button @click="editUser(user)">Edit</button>
            <button @click="deleteUser(user.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="toggleAddForm">Add New User</button>

    <UserForm v-if="showAddForm || showEditForm" :is-editing="showEditForm"
      :user-data="showEditForm ? editedUser : newUser" @form-submitted="handleFormSubmitted"
      @form-canceled="cancelForm" />

  </div>
</template>
  
<script>
import UserForm from "@/components/UserForm";
import NetworkManager from "@/network";

export default {
  name: "UserList",
  components: {
    UserForm,
  },
  data() {
    return {
      users: [],
      showEditForm: false,
      editedUser: {
        id: null,
        name: "",
        email: "",
        img: null,
      },
      showAddForm: false,
      newUser: {
        name: "",
        email: "",
        pass: "",
        img: null,
      },
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await NetworkManager.apiRequest("list", {}, true, "application/json");
        this.users = response.data.users;
        this.users = response.data.users.map(user => ({
          ...user,
          img: user.img ? `${process.env.VUE_APP_BASE_URL}${user.img}` : null,
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    async deleteUser(userId) {
      try {
        const result = await this.$swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this user!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, cancel",
        });

        if (result.isConfirmed) {
          await NetworkManager.apiRequest(
            `delete/${userId}`,
            {},
            true,
            "application/json"
          );
          this.users = this.users.filter((user) => user.id !== userId);

          await this.$swal("Deleted!", "The user has been deleted.", "success");
        } else {
          await this.$swal("Cancelled", "Your user is safe!", "info");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        await this.$swal("Error", "An error occurred while deleting the user.", "error");
      }
    },
    editUser(user) {
      this.showEditForm = true;
      this.editedUser = { ...user };
    },
    cancelEdit() {
      this.showEditForm = false;
      this.editedUser = {
        id: null,
        name: "",
        email: "",
        img: null,
      };
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      this.editedUser.img = file;
    },
    async updateUser(submitedFormData) {
      try {
        

        await NetworkManager.apiRequest(
          `update/${this.editedUser.id}`,
          submitedFormData,
          true,
          "multipart/form-data"
        );

        this.showEditForm = false;
        this.fetchUserData();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },

    toggleAddForm() {
      this.showAddForm = true;
    },
    cancelAdd() {
      this.showAddForm = false;
      this.newUser = {
        name: "",
        email: "",
        img: null,
      };
    },
    handleNewFileChange(event) {
      const file = event.target.files[0];
      this.newUser.img = file;
    },
    async addUser(submitedFormData) {
      try {
     
        await NetworkManager.apiRequest(`create`, submitedFormData, true, "multipart/form-data");

        this.showAddForm = false;
        this.fetchUserData();
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }, handleFormSubmitted({ action, data }) {
      console.log("data Get" + data + " AC " + (action === 'update'));
      if (action === 'add') {
        // Handle data for add action
        this.addUser(data);
        console.log(data);

      } else if (action === 'update') {
        // Handle data for update action
        this.updateUser(data);
      }
    },cancelForm(){
this.showAddForm =  false;
this.showEditForm = false;
    },
  },
};
</script>
  
<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

img {
  max-width: 50px;
  max-height: 50px;
}

button {
  margin-right: 5px;
}

form {
  margin-top: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

.modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.modal h2 {
  margin-bottom: 20px;
}
</style>
  