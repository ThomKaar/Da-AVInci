<template>
   <v-card flat>
      <v-toolbar color="elevation-0">
         <v-img
            class="mx-2"
            src="@/assets/black_logo_large_art.svg"
            max-height="100"
            max-width="100"
            contain
            tabindex="1"
            @click="goToPage('/')"
         />
         <v-spacer></v-spacer>
         <v-btn
            text
            v-for="(page, i) in pages"
            :key="i"
            :tabindex="i+1"
            class="navlink navlabel"
            :class="{active: page.path == activePage}"
            @click="goToPage(page.path)"
         >
            {{page.name}}
         </v-btn>
      </v-toolbar>
   </v-card>
</template>

<script>
  export default {
    data: () => ({
       title: "ART BY MAKENA KONG",
       pages: [
          {name: "about", path: "/"},
          {name: "work", path:"/work"}
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
   .navlink {
      color: #000;
      cursor: url(https://art-by-makena-kong.s3.us-east-2.amazonaws.com/cursor.png), auto;
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