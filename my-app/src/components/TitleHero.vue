<template>
    <div class="title">
        <h1> Art By Makena </h1> 
    </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js';
export default {
    data() {
        
        return {
            message: '',
        } 
    },
    async mounted() {
        anime({
            targets: '.title',
            translateX: 0,
            keyframes: [                
                {translateX: 250},
                {translateX: 0},
            ],
            easing: 'easeOutElastic(1, .8)',
            // rotate: '2turn',
            duration: 4000,
            loop: true,
        });
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