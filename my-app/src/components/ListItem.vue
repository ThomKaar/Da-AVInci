<template>
   <div class="listItem">
    <h4 class="heading"> {{ this.heading.toUpperCase() }} </h4>
    <ul>
        <li
        v-for="item of list"
        v-bind:key="item.id"
        >
            <a v-if="item.externalUrl" v-bind:href="item.externalUrl.S" class="link">
                <h4 v-if="item.label" class="label"> {{ item.label.S.toLowerCase() }}</h4>
                <h4 v-if="item.content && item.content.S != 'images' && item.content.S != 'internal'" class="content"> {{ item.content.S.toLowerCase() }} </h4>
            </a>
            <a v-if="!item.externalUrl" class="link">
                <h4 v-if="item.label" class="label"> {{ item.label.S.toLowerCase() }}</h4>
                <h4 v-if="item.content && item.content.S != 'images' && item.content.S != 'internal'" class="content"> {{ item.content.S.toLowerCase() }} </h4>
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
    ],
    data() {
    }
}
</script>
<style scoped>
.heading {
    margin: 0% 0% 4% 0%;
}
h4 {
    margin: 0% 0% 0% 0;
    color: #74b0f8;
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
  height: 50%;
  text-align: left;
}
a {
  text-decoration: none;
  color: #2c3e50;
}
.label {
    font-size: 14px;
    float: left;
    width: 30%;
}
.content {
    font-size: 14px;
    width: 50%;
    float: left;
    margin-left: 10%;
    text-align: left;
}
</style>