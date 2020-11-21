<template>
  <div class="notfound my-16">
      <v-container class="text-center">
         <h1 class="questionmarks text-h2 text-xs-h3 text-sm-h2 text-md-h1 text-lg-h1 text-xl-h1 my-16">
            <span class="rainbow ">???</span>
         </h1>
         <h5 class="message text-h2 text-xs-h3 text-sm-h2 text-md-h1 text-lg-h1 text-xl-h1 my-16">
            I think you are lost ...
         </h5>
      </v-container>
  </div>
</template>

<script>
export default {
   name: 'NotFound',
}
</script>

<style scoped>
   .message {
      font-family: "TW Cen MT" !important;
      font-size: 75px !important;
   }

   .questionmarks {
      font-family: "TW Cen MT" !important;
      font-size: 300px !important;
   }

  .rainbow {
    font-weight: bolder;
    background: linear-gradient(-50deg,  #A15995 20%, #51186C 40%, #51186C 60%, #3e97a3 80%);
    background-size: 300% auto;
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
