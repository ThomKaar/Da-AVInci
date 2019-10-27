<template>
   <div class="listItem">
    <h4> {{ heading.toUpperCase() }} </h4>
    <ul>
        <li
        v-for="item in list"
        v-bind:key="item.id"
        >
            <a v-bind:href="item.link">
                {{ item.text.toLowerCase() }}
            </a>
        </li>
    </ul>
    <br>
  </div> 
</template>
<script>
export default {
    props: [
        'list',
        'heading',
    ]
}
</script>
<style scoped>
h4 {
    margin: 0% 0 4% 0;
    color: #a6ceff;
}
h4:hover{
    color: #e6ae97;
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
  text-decoration: none;
  color: #2c3e50;
}
</style>