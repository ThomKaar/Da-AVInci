<template>
    <div class="title">
        <h1> {{ message.toUpperCase() }}</h1>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message: 'default title'
        } 
    },
}
</script>

<style scoped>
h1 {
  text-align: left;
  color: #3D93AB;
  font-weight: bolder;
}
</style>