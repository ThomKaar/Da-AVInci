<template>
    <div class="infoList">
    <ul>
        <li v-for="section of ListItems"
        v-bind:key="section.id">
            <ListItem
            v-bind:heading="section.category"
            v-bind:list="section.items"
            ></ListItem>
        </li>
    </ul>
  </div>
</template>
<script>
import ListItem from './ListItem.vue';
import { CategoryProvider } from '../providers';


export default {
    components: {
        ListItem,
    },
    data () {
        return {
           ListItems: []
        }
    },
    async mounted() {
      var provider = new CategoryProvider();
      this.ListItems = await provider.getCategoryItems();
    },
}
</script>
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  width: 100%;
  text-align: left;
}
a {
  color: #42b983;
}
</style>