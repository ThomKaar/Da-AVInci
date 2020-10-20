<template>
   <v-card flat>
      <v-toolbar color="elevation-0">
         <v-toolbar-title class="navtitle">
            <a class="navlink"
               tabindex="1"
               @click="goToPage('/')">
               {{title}}
            </a>
         </v-toolbar-title>
         <v-spacer></v-spacer>
         <a 
            v-for="(page, i) in pages"
            :key="i"
            :tabindex="i+1"
            class="navlink navlabel"
            :class="{active: page.path == activePage}"
            @click="goToPage(page.path)"
         >
            {{page.name}}
         </a>
      </v-toolbar>
   </v-card>
</template>

<script>
  export default {
    data: () => ({
       title: "ART BY MAKENA KONG",
       pages: [
          {name: "ABOUT", path: "/"},
          {name: "WORK", path:"/work"}
       ],
       activePage: window.location.pathname
    }),
    methods: {
      goToPage(path) {       
         this.$router.push(path);
         this.activePage = path
      },
    }
  }
</script>

<style scoped>
   .navtitle {
      font-size: 25px;
      font-weight: bolder;
      margin: 1% 1% 0% 1%;
   }

   .navlink {
      color: #000;
   }

   .navlink:hover {
    color: #A15995;
    text-decoration: underline;
   }
   .navlink:focus {
      color: #A15995;
      text-decoration: underline;
   }

   .navlabel {
      color: #000;
      font-size: 20px;
      font-weight: normal;
      padding-right: 1%
   }

   .navlabel:last-child {
      padding-right: 0px
   }

   .active {
      font-weight: bolder;
   }

</style>