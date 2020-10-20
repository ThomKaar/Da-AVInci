<template>
  <div class="home">
    <v-row >
      <v-col 
        cols="12" xs="12" sm="12" md="3" lg="3" xl="3"
        order="2" order-md="1" order-lg="1" order-xl="1">
        <InfoMenu id="info-menu" />
      </v-col>
      <v-spacer></v-spacer>
      <v-col 
        cols="12" xs="12" sm="12" md="9" lg="9" xl="9" 
        order="1" order-md="2" order-lg="2" order-xl="2">
        <h1 id="summary" 
          class="text-h2 text-xs-h3 text-sm-h2 text-md-h1 text-lg-h1 text-xl-h1">
          <span class="rainbow">MAKENA KONG</span> 
          IS A PAINTER AND ALL AROUND WEIRDO.
          SHE IS DOING
          <span class="rainbow">COMMISSIONED OIL PAINTINGS</span>
          OF PET AND HUMAN PORTRAITURE.
          SHE MINORED IN STUDIO ART AT CAL POLY SLO IN 2020, BUT
          SHE HAS SPENT HER WHOLE LIFE DOING ARTS AND CRAFTS WITH HER GRANDMA.
        </h1>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import InfoMenu from "../components/InfoMenu";

  export default {
    name: 'Home',
    components: {
      InfoMenu
    },
  };
</script>

<style scoped>
  .home {
    padding: 2%;
  }
  #info-menu {
    transform: translateY(10%);
    text-align: left;
  }
  #summary {
    font-size: 60px;
    font-weight: 400;
  }
  .rainbow {
    font-weight: bolder;
    background: linear-gradient(-50deg,  #A15995 20%, #51186C 40%, #51186C 60%, #3e97a3 80%);
    background-size: 200% auto;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    animation-name: flow;
    animation-duration: 3s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;

    -webkit-animation-name: flow;
    -webkit-animation-duration: 3s;
    -webkit-animation-timing-function: ease-in-out;
    -webkit-animation-iteration-count: infinite;
  }

  @keyframes flow {
    to {
      background-position: 200%
    }
  }

  @-webkit-keyframes flow {
    to {
      background-position: 200%;
    }
  }
</style>
