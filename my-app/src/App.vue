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
    font-family: "TW Cen MT"
  }
  @font-face {
    font-family: "TW Cen MT";
    src: local("TW Cen MT"),
    url(./assets/fonts/tw-cen-mt-std/TwCenClassMTStd-Regular.otf) format("otf");
  }
</style>
