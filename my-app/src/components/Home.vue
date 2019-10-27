<template>
  <div class="home">
    <TitleHero id="titleHero"> </TitleHero>
    <InfoList id="InfoList"></InfoList>
    <Gallery id="carousel"> </Gallery>
  </div>
</template>

<script>
import Gallery from './Gallery';
import InfoList from './InfoList';
import TitleHero from './TitleHero';

export default {
  name: 'Home',
  components: {
    Gallery,
    InfoList,
    TitleHero,
  },
};
</script>
<style scoped>
#titleHero {
  margin: 0 0 5% 5%;
  width: 30%;
}
#InfoList {
  display: box; 
  float: left;
  text-align: left;
  margin: 0 0 0 5%;
  width: 25%;
}
#carousel {
  width: 70%;
  float: right;
}
</style>
