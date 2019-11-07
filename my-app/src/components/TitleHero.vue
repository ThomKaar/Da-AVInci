<template>
    <div class="title">
        <h1> {{ message.toUpperCase() }}</h1>
    </div>
</template>

<script>
import { ItemProvider } from '../providers';
export default {
    data() {
        
        return {
            message: 'default title'
        } 
    },
    async mounted() {
        let itemProvider = new ItemProvider();
        let titleObj = await itemProvider.getTitleItem();
        console.log(JSON.stringify(titleObj)); // eslint-disable-line
        this.message = titleObj.Item.content.S;
    }
}
</script>

<style scoped>
h1 {
  text-align: left;
  color: #3D93AB;
  font-weight: bolder;
}
</style>