 <template>
    <div >
        <h1 class="text-right mb-10">{{collectionName.toUpperCase()}}</h1>

        <div class="d-flex justify-start align-start flex-wrap">
            <div
            v-for="(image) of images"
            :key="image.url.S"
            class="image-box">
                <v-img
                class="image"
                contain
                aspect-ratio=1
                :src=image.url.S
                />
                <p class="image-title text-center">
                    {{ image.title.S }}
                </p>
            </div>
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
            collectionName: ""
        };
    },
    methods: {
        randomNumber(min,max) {
            return Math.random() * (max - min) + min; 
        }
    },
    async mounted() {        
        let imageProvider = new ImageProvider();
        this.$root.$on('updateGallery', async (imageIds,label) => {
            let numids = [];
            for (let id of imageIds.L) 
                numids.push(id.N);
            this.$data.images = await imageProvider.getImagesByCollection(numids);
            this.$data.collectionName = label
        });
    },
}
</script>

<style scoped>

.image-box {
    margin: 20px;
}

.image-box:hover .image-title{
    display: block
}


.image-title {
    display: none;
}

.image {
    min-height: 600px;
    max-height: 2000px;
    min-width: 600px;
    max-width: 2000px;
    width: auto;
    height: auto;
}

</style>

 
 
 
