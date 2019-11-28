<template>
    <div class="title">
        <h1> Da Avinci</h1> 
    </div>
</template>

<script>
// import { ItemProvider } from '../providers';
export default {
    data() {
        
        return {
            message: '',
        } 
    },
    async mounted() {
        // let itemProvider = new ItemProvider();
        // let titleObj = await itemProvider.getTitleItem();
        // this.message = titleObj.Item.content.S;
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