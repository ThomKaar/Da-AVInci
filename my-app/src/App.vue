<template>
  <div>
    <v-app>
      <v-content>   
        <NavBar id="navbar"></NavBar>
        <router-view></router-view>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import NavBar from './components/NavBar';
export default {
  name: 'App',
  components: {
    NavBar
  },
  data: () => ({}),
};
</script>

<style>
  #app {
    background-color: #Fefefe;
    cursor: url(https://art-by-makena-kong.s3.us-east-2.amazonaws.com/cursor.png), auto;
  }
</style>
