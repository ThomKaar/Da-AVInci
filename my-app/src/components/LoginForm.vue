<template>
  <div class="login">
    <h2>{{title}}</h2>
    <v-form 
      id='login-form' 
      v-model="valid"
      >
        <v-container>
          <v-row>
            <v-col cols="12" md="6" lg="6" xl="6">
              <v-text-field
              v-model="UserName"
              label="UserName"
              required
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" lg="6" xl="6">
              <v-text-field
              v-model="Password"
              label= "Password"
              :type="'password'"
              required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>        
            <v-btn id="login-btn" @click="login">
              Login
            </v-btn>
          </v-row>
        </v-container>
        

    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "For Makena Only!!!!"
    }
  },
  methods: {
    login() {
      this.$router.push('/editSite');
    }
  }
}
</script>

<style scoped>

.login {
  transform: translateY(50%);
}

#login-form {
  background: transparent
}
</style>