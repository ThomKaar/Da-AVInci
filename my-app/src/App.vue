<template>
<div>
  <v-app>
    <v-content>   
      <router-view></router-view>
    </v-content>
  </v-app>
</div>
  
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
#app {
  background-color: #FBF6E2;
}
</style>
