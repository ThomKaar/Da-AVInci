<template>
   <div class="listItem">

    <!-- category -->
    <h4 class="heading"> 
        {{ this.heading.toUpperCase() }} 
    </h4>

    <!-- items -->
    <ul>
        <li
        v-for="(item, i) of list"
        v-bind:key="i"
        :tabindex="i+3"
        >
            <!-- external links -->
            <a 
            v-if="item.externalUrl" 
            :href="item.externalUrl.S" 
            class="link"
            target="_blank"
            >
                <v-icon small
                v-if="item.icon" 
                class="icon mt-1 mr-3"
                > 
                    {{ item.icon.S }} 
                </v-icon>
                <h4 
                v-if="item.label" 
                class="label"
                >
                    {{ item.label.S.toLowerCase() }}
                </h4>
            </a>

            <!-- gallery links -->
            <a 
                v-if="!item.externalUrl" 
                class="link" 
                @click="imageSelect(item.imageIds)"
                >
                <h4 
                v-if="item.label" 
                class="label"
                >
                    {{ item.label.S.toLowerCase() }}
                </h4>
            </a>
        </li>
    </ul>
    <br>
  </div> 
</template>

<script>
//import anime from 'animejs/lib/anime.es.js';
export default {
    props: [
        'list',
        'heading',
    ],
    data() {
        return {};
    },
    mounted() {
        //anime.js stuff
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
    margin: 0% 0% 2.5% 0%;
    color: #555;
}
h4 {
    margin: 0% 0% 0% 0%;
    color: #000;
    font-weight: bolder
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
  color: #000;
    cursor: url(https://art-by-makena-kong.s3.us-east-2.amazonaws.com/cursor.png), pointer;
}
.label {
    font-size: 16px;
    float: left;
    width: 30%;
}
.icon {
    float: left;
    color: #000;
    margin-top: 0.5%;
}
.link:hover .icon {
    color: #A15995;
    text-decoration: underline;
}
.link:hover h4 {
    color: #A15995;
    text-decoration: underline;
}
</style>