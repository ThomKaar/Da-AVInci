<template>
    <div class="info-menu">
      <ul>
          <li 
           v-for="section of items"
            :key="section.id">
              <ListItem
                :heading="section.category"
                :list="section.items"
                />
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
            items: [],
            allowed_categories: ["about", "contact"]
          }
      },
      async mounted() {
        var provider = new CategoryProvider();
        this.items = await provider.getCategoryItems().then((res) => {
          return res.filter(el => {
            return this.allowed_categories.includes(el.category)
          })
        })
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
    padding-bottom: 2%;
  }
  a {
    color: #42b983;
  }
</style>