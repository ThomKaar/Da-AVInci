<template>
   <div class="work">
      <v-row >
         <v-col 
            cols="12" xs="12" sm="12" md="3" lg="3" xl="3"
            order-sm="2" order-md="1" order-lg="1" order-xl="1"
         >
            <WorkMenu id="work-menu" />
         </v-col>
         <v-spacer></v-spacer>
         <v-col 
            cols="12" xs="12" sm="12" md="9" lg="9" xl="9" 
            order-sm="1" order-md="2" order-lg="2" order-xl="2"
         >
               <GallerySet id="gallery" />
         </v-col>
      </v-row>
   </div>
</template>

<script>
   import WorkMenu from '../components/WorkMenu';
   import GallerySet from '../components/GallerySet';

   export default {
      name: 'Work',
      components: {
         WorkMenu,
         GallerySet
      }
   };
</script>

<style>
  .work {
    padding: 2%;
  }
  #work-menu {
    transform: translateY(10%);
    text-align: left;
    z-index: 1;
    background: rgb(254,254,254, 0.75);
  }
  #gallery {
     z-index: 10
  }
</style>