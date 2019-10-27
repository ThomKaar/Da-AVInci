<template>
    <div class="infoList">
    <ul>
        <li v-for="item in ListItems"
        v-bind:key="item.id">
            <ListItem
            v-bind:heading="item.heading"
            v-bind:list="item.list"
            ></ListItem>
        </li>
    </ul>
  </div>
</template>

<script>
import ListItem from './ListItem.vue';
// import { CategoryProvider } from '../providers';


export default {
    components: {
        ListItem,
    },
    data () {
        // let categProvider = new CategoryProvider();
        // let categories = categProvider.getAllCateogries();
        // let listItems = [];
        // for (let category in categories) {
        //     if (category.items.length) {
        //         listItems.push(category);
        //     }
            
        // }

        return {
            ListItems: [
                {id: 2, heading: 'ProjECTS', list: [
                {id: 1, text: 'a', link: 'https://www.google.com'},
                {id: 2, text: 'b', link: 'https://www.google.com'},
                {id: 3, text: 'c', link: 'https://www.google.com'},
                ]},
                {id: 3, heading: 'CONTACT', list: [
                    {id: 1, text: 'Instagram\t@yaboii', link: 'https://www.google.com'},
                    {id: 2, text: 'Twitter\t@yaboii', link: 'https://www.google.com'},
                    {id: 3, text: 'Email\tyaboii@gmail.com', link: 'https://www.google.com'},
                    {id: 4, text: 'GitHub', link: 'https://www.google.com'},
                ]},
                {id: 1, heading: 'ABOUT', list: [
                    {id: 1, text: 'Sign', link: 'https://www.google.com'},
                    {id: 2, text: 'Info', link: 'https://www.google.com'},
                    {id: 3, text: 'Resume', link: 'https://www.google.com'},
                ]},
                {id: 4, heading: 'OTHER', list: [
                    {id: 1, text: 'a', link: 'https://www.google.com'},
                    {id: 2, text: 'b', link: 'https://www.google.com'},
                    {id: 3, text: 'c'},
                    ]},
                ]
        }
    },
    mounted() {
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