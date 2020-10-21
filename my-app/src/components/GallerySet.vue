 <template>
    <div id="gallery-set">
        <!-- add title here?-->

        <div
            v-for="(image) of images"
            :key="image.url.S"
            :style="{'left': randomNumber(0, 1000)}"
            class="image-box">
                <v-img
                class="image"
                contain
                aspect-ratio=1
                :src=image.url.S
                />
                <p class="image-title text-center">
                    {{ image.title.S.toLowerCase() }}
                </p>
        </div>

    </div>
</template>

<script>
import { ImageProvider } from '../providers';
//import anime from 'animejs/lib/anime.es.js';

export default {
    data () {
        return {
            images: [],
        };
    },
    methods: {
        randomNumber(min,max) {
            return Math.random() * (max - min) + min; 
        }
    },
    async mounted() {        
        let imageProvider = new ImageProvider();
        let defaultImages = await imageProvider.getDefaultImages();
        this.$data.images = defaultImages;
        this.$root.$on('updateGallery', async (imageIds) => {
            let numids = [];
            for (let id of imageIds.L) {
                numids.push(id.N);
            }
            let backendImages = await imageProvider.getImagesByCollection(numids);
            this.$data.images = backendImages;
        });
    

    },
}
</script>

<style scoped>


.image-box {
}

.image-box:hover .image{
    max-height: 400px;
}

.image-box:hover .image-title{
    display: block;
}

.image {
    width: 100%;
    float: left;
    max-height: 300px;
}

.image:hover {
    max-height: 400px;
}

.image-title {
    display:none;
    color: #000;
    text-align: "left"
}
</style>

 
 
 
