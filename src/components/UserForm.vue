<!-- components/UserForm.vue -->
<template>
  <div class="modal">
    <h2>{{ isEditing ? 'Edit User' : 'Add New User' }}</h2>
    <form @submit.prevent="isEditing ? updateUser() : addUser()">
      <label for="name">{{ isEditing ? 'Edit' : 'Add' }} Name:</label>
      <input type="text" id="name" v-model="localUserData.name" required>

      <label for="email">{{ isEditing ? 'Edit' : 'Add' }} Email:</label>
      <input type="email" id="email" v-model="localUserData.email" required>

      <label for="pass" v-if="!isEditing">Password:</label>
      <input type="password" id="pass" v-model="localUserData.pass" v-if="!isEditing" required>

      <label for="image">Image:</label>
      <input type="file" accept="image/*" @change="handleFileChange" class="form-control-file" id="image">


      <div class="border p-2 mt-3">
        <p>Preview Here:</p>
        <img :src="isEditingImg ? localUserData.img : imgurl" class="img-fluid" width="100px" />
      </div>

      <button type="submit">{{ isEditing ? 'Update User' : 'Add User' }}</button>
      <button type="button" @click="cancelForm">Cancel</button>

    </form>
  </div>
</template>

<script>
export default {
  props: {
    isEditing: Boolean,
    userData: Object,
  },
  data() {
    return {
      localUserData: { ...this.userData},
      isEditingImg:{...this.userData.img},
      imgurl: null, // Add imgurl to data

    };
  },
  methods: {
    async addUser() {
      try {
        const formData = new FormData();
        formData.append("name", this.localUserData.name);
        formData.append("email", this.localUserData.email);
        formData.append("password", this.localUserData.pass);
        if (this.localUserData.img) {
          formData.append("img", this.localUserData.img);
        }
        console.log('User added successfully');
        //this.$emit('submit', { ...this.formData });
        this.$emit('form-submitted', { action: 'add', data: formData });

      } catch (error) {
        console.error('Error adding user:', error);
      }
    },

    async updateUser() {
      try {
        const formData = new FormData();
        formData.append("id", this.localUserData.id);
        formData.append("name", this.localUserData.name);
        formData.append("email", this.localUserData.email);
        if (this.localUserData.img) {
          formData.append("img", this.localUserData.img);
        }
        console.log('User updated successfully');
        this.$emit('form-submitted', { action: 'update', data: formData });

      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    cancelForm() {
      console.log('Form canceled');
      this.$emit('form-canceled');
    },

    handleFileChange(event) {
      const file = event.target.files[0];
      console.log('File changed:', file);
      this.localUserData.img = file;
      this.imgurl = URL.createObjectURL(file);
      this.isEditingImg=false;
    },
  },
  watch: {
    userData: {
      handler(newVal) {
        console.log('userData changed:', newVal);
        this.localUserData = { ...newVal };
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
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

form {
  margin-top: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  margin-bottom: 10px;
}

button {
  margin-right: 5px;
}
</style>
