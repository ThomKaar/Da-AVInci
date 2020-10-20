 <template>
    <div>
        <v-carousel class="carousel"
            hide-delimiters
            show-arrows-on-hover
            >
            <v-carousel-item
                v-for="(image) of images"
                :key="image.url.S"
            >
                <v-img
                    contain
                    max-height="475px"
                    aspect-ratio=1
                    :src=image.url.S
                    >
                </v-img>
                <v-row class="title-row">
                    <p class="title-display">{{ image.title.S.toLowerCase() }}</p>
                </v-row>
            </v-carousel-item>
        </v-carousel>
        
    </div>
</template>
<script>
import { ImageProvider } from '../providers';
import anime from 'animejs/lib/anime.es.js';
export default {
    data () {
        return {
            colors: [
                'primary',
                'secondary',
                'yellow darken-2',
                'red',
                'orange',
            ],
            images: [],
        };
    },
    async mounted() {
        let imageProvider = new ImageProvider();
        let defaultImages = await imageProvider.getDefaultImages();
        this.$data.images = defaultImages;
        this.$root.$on('updateGallery', async (imageIds) => {
            let imageProvider = new ImageProvider();
            let numids = [];
            for (let id of imageIds.L) {
                numids.push(id.N);
            }
            let backendImages = await imageProvider.getImagesByCollection(numids);
            this.$data.images = backendImages;
        });

            anime({
            targets: "#wrapper",
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
                {translateY: -1},
                {translateX: -1},
                {translateY: 0},
                {translateX: 0},
            ],
            duration: 1000,
            loop: true});


             anime({
            targets: ".carousel",
            keyframes: [
                {translateY: 5},
                {translateX: 5},
                {translateY: 2},
                {translateX: 2},
                {translateY: 5},
                {translateX: 5},
                {translateY: 0},
                {translateX: 0},
                {translateY: -5},
                {translateX: -5},
                {translateY: -5},
                {translateX: -2},
                {translateY: 0},
                {translateX: 0},
            ],
            duration: 1000,
            loop: true});
    },
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.gallery {
    margin: 16px 0 0 0;
}
p {
    color: #2c3e50;

}
p:hover {
    color: #e6ae97;
}
img {
    width: 100%;
    float: left;
}
.displayImage {
    max-height: 85.5%;
    max-width: 100%;
}
.title-display {
    font-size: 16px;
    color: #74b0f8;
    margin-bottom: 0%;
    margin: auto;
    text-align: center;
}

.title-display:hover{
    color: #74b0f8;
}
.title-row {
    margin-left: 0%;
    text-align: center;
}
.previewImage {
    float: left;
    width: 50px;
    height: 50px;
    margin: 3px;
    border: solid;
    border-color: #74b0f8;
}
#wrapper {
    text-align: center;
}
.previewDiv {
    display:inline-block;
}


</style>

 
 
 
