<template>
  <div class="loginForm">
    <v-form id='form' v-model="valid">
              <v-text-field
              v-model="UserName"
              label="UserName"
              required
              ></v-text-field>
              <v-text-field
              v-model="Password"
              label= "Password"
              :type="'password'"
              required
              ></v-text-field>
      </v-form>
      <v-btn id="loginBtn" v-on:click="login">
          Login
      </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$router.push('/editSite');
    }
  }
}
</script>

<style scoped>
.loginForm {
  padding-bottom: 5%;  
}
</style>