<template>
  <div class="tile">
    <div id="form"> 
      <LoginForm></LoginForm>
    </div>
  </div>
</template>

<script>
import LoginForm from './LoginForm';
export default {
    components: {
        LoginForm,
    },
}
</script>
<style scoped>
.tile {
  max-width: 50%;
  margin: auto;
  background-color: #B0E3FF;
}

#form {
  max-width: 90%;
  margin: auto;
}
</style>
