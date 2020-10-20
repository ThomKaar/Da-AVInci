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

<style scoped>
  #app {
    background-color: #Fefefe;
  }
</style>
