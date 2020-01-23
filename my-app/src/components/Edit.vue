<template>
    <div class="editVue">
        <nav class="nav">
            <a  class="sideBar" v-on:click="makeActive('sideBar')">
                Side Bar Edit
            </a>
            <a class="imageEdit" v-on:click="makeActive('imageEdit')">
                Image Edit
            </a>
        </nav>
        <SideBarEdit v-if="this.active == 'sideBar'" class="editContent"></SideBarEdit> 
        <ImageEdit v-if="this.active == 'imageEdit'" class=editContent></ImageEdit>
  </div>
</template>
<script>
import SideBarEdit from './SideBarEdit';
import ImageEdit from './ImageEdit';
export default {
    components: {
        SideBarEdit,
        ImageEdit,
    },
    data: function() {
        return {
            active: 'sideBar',
        }
    },
    methods: {
        makeActive: function(item) {
            this.active = item;
        }
    }
}
</script>
<style scoped>
nav{
    width: fit-content;
    margin: 3% auto 2% auto;
    background-color:#29B6;
    box-shadow:0 1px 1px #ccc;
    border-radius:2px;  
}

nav a{
    display:inline-block;
    padding: 18px 30px;
    color:#fff !important;
    font-weight:bold;
    font-size:16px;
    text-decoration:none !important;
    line-height:1;
    text-transform: uppercase;
    background-color:transparent;

    -webkit-transition:background-color 0.25s;
    -moz-transition:background-color 0.25s;
    transition:background-color 0.25s;
}

nav a:first-child{
    border-radius:2px 0 0 2px;
}

nav a:last-child{
    border-radius:0 2px 2px 0;
}

nav.sideBar .sideBar,
nav.imageEdit .imageEdit {
    background-color:#e35885;
}
</style>
