<template>
   <div class="listItem">
    <h4 class="heading"> {{ this.heading.toUpperCase() }} </h4>
    <ul>
        <li
        v-for="(item, i) of list"
        v-bind:key="i"
        >
            <a v-if="item.externalUrl" v-bind:href="item.externalUrl.S" class="link">
                <v-icon v-if="item.icon" class="icon"> {{ item.icon.S }} </v-icon>
                <h4 v-if="item.label" class="label">{{ item.label.S.toLowerCase() }}</h4>
                <h4 v-if="item.content && item.content.S != 'images' && item.content.S != 'internal'" class="content"> {{ item.content.S.toLowerCase() }} </h4>
            </a>
            <a v-if="!item.externalUrl" class="link" v-on:click="imageSelect(item.imageIds)">
                <h4 v-if="item.label" class="label"> {{ item.label.S.toLowerCase() }}</h4>
                <h4 v-if="item.content && item.content.S != 'images' && item.content.S != 'internal'" class="content"> {{ item.content.S.toLowerCase() }} </h4>
            </a>
        </li>
    </ul>
    <br>
  </div> 
</template>
<script>
import anime from 'animejs/lib/anime.es.js';
export default {
    props: [
        'list',
        'heading',
    ],
    data() {
        return {};
    },
    mounted() {


        var headingAnimation = anime.timeline({ // eslint-disable-line
                targets: '.heading',
                delay: function(el, i) { return i * 100},
                endDelay: 1000,
                easing: 'easeInOutQuad',
                direction: 'alternate',
                loop: true,
        })
        .add({color: '#e6ae97', loop: false,})
        .add({color: '#74b0f8', delay: 1000, loop: false,})
        .add({ keyframes: [
                {translateY: 1},
                {translateX: 1},
                {translateY: 2},
                {translateX: 2},
                {translateY: 1},
                {translateX: 1},
                {translateY: 0},
                {translateX: 0},
                {translateY: -1},
                {translateX: -1},
                {translateY: -2},
                {translateX: -2},
                {translateY: 0},
                {translateX: 0},
                {translateY: 1},
                {translateX: 1},
                {translateY: 2},
                {translateX: 2},
                {translateY: 1},
                {translateX: 1},
                {translateY: 0},
                {translateX: 0},
                {translateY: -1},
                {translateX: -1},
                {translateY: -2},
                {translateX: -2},
                {translateY: 0},
                {translateX: 0},
            ],
            duration: 2000,
            loop: true});

        anime({
            targets: '.heading',
            translateX: 0,
            keyframes: [
                {translateX: 150},
                {translateX: 0},
            ],
            easing: 'easeOutElastic(1, .8)',
            rotate: '2turn',
            duration: 5000,
            loop: false,
        });

        anime({
            targets: '.label',
            keyframes: [
                {translateY: 1},
                {translateX: 1},
                {translateY: 2},
                {translateX: 2},
                {translateY: 1},
                {translateX: 1},
                {translateY: 0},
                {translateX: 0},
                {translateY: -1},
                {translateX: -1},
                {translateY: -2},
                {translateX: -2},
                {translateY: 0},
                {translateX: 0},
            ],
            easing: 'easeOutElastic(1, .5)',
            // rotate: '2turn',
            duration: 1000,
            loop: true,
        });

        anime({
            targets: '.content',
            keyframes: [
                {translateY: 1},
                {translateX: 1},
                {translateY: 2},
                {translateX: 2},
                {translateY: 1},
                {translateX: 1},
                {translateY: 0},
                {translateX: 0},
                {translateY: -1},
                {translateX: -1},
                {translateY: -2},
                {translateX: -2},
                {translateY: 0},
                {translateX: 0},
            ],
            easing: 'easeOutElastic(1, .5)',
            // rotate: '2turn',
            duration: 1000,
            loop: true,
        });

        anime({
            targets: '.icon',
            keyframes: [
                {translateY: 1},
                {translateX: 1},
                {translateY: 2},
                {translateX: 2},
                {translateY: 1},
                {translateX: 1},
                {translateY: 0},
                {translateX: 0},
                {translateY: -1},
                {translateX: -1},
                {translateY: -2},
                {translateX: -2},
                {translateY: 0},
                {translateX: 0},
            ],
            rotate: {
                value: 450,
                duration: 2000,
                easing: 'easeInOutSine'
            },
            easing: 'easeOutElastic(1, .5)',
            // rotate: '2turn',
            duration: 1000,
            loop: true,
        });


        
    },
    methods: {
        imageSelect(imageIds) {
            if (imageIds && imageIds.L && imageIds.L.length) {
                this.$root.$emit('updateGallery', imageIds);
            }
        }
        
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
.icon {
    font-size: 18px;
    float: left;
    color: #74b0f8;
}
.content {
    font-size: 14px;
    width: 50%;
    float: left;
    margin-left: 10%;
    text-align: left;
}
.link:hover .icon {
    color: #e6ae97;
}
.link:hover h4 {
    color: #e6ae97;
}
</style>