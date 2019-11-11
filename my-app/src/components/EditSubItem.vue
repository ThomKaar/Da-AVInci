<template>
  <div>
      <form>
        
      </form>
  </div>
</template>
<script>
export default {
    props: [
        'index',
        'value',
    ],
    data () {
        return {};
    }
}
</script>
<style scoped>
#editItem {
    width: 90%;
    height: fit-content;
    margin-left: 5%;
    margin-right: 0%;
}
.editField {
    max-height: 30%;
    width: 70%;
    font-size: 16px;
    padding-top: 10%;
}
.editButton {
    float: left;
    margin-top: -5%;
}
</style>