 <template>
    <div >
        <h1 class="text-right mb-10">{{collectionName.toUpperCase()}}</h1>

        <div v-if="images.length>0"
        class="d-flex justify-start align-start flex-wrap">
            <div
            v-for="(image) of images"
            :key="image.url.S"
            class="image-box">
            <div class="content">
                <div class="content-overlay"></div>
                <v-img
                class="image"
                contain
                aspect-ratio=1
                :src=image.url.S
                />
                
                    <div class="content-details">
                    <p class="image-title text-center">
                        {{ image.title.S }}
                    </p>
                    </div>
                </div>
        </div>
        </div>

        <div v-else>
            <v-img 
            class="mx-auto welcome_img"
            :src=welcomeImg
            max-height="800"
            max-width="800"
            />
        </div>
    </div>
</template>

<script>
import { ImageProvider } from '../providers';
//import anime from 'animejs/lib/anime.es.js';

export default {
    data () {
        return {
            welcomeImg: "https://art-by-makena-kong.s3.us-east-2.amazonaws.com/Welcome.jpg",
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

.welcome_img {
    box-shadow: 0 0 1rem 2rem #F4E5E2
}

.image-box {
    margin: 20px;
}

.image {
    min-height: 600px;
    max-height: 2000px;
    min-width: 600px;
    max-width: 2000px;
    width: auto;
    height: auto;
}

.content {
  position: relative;
  margin: auto;
  overflow: hidden;
  padding: 1rem;
}

.content .content-overlay {
  position: absolute;
  height: 99%;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  opacity: 0;
  z-index: 5;
  background-image:
    radial-gradient(
      circle closest-side,
      #000,
      transparent
    );
}

.content-details {
  position: absolute;
  width: 100%;
  opacity: 0;
}

.image-title {
    color: #fff;
    font-size: 25px;
}

.content:hover .content-overlay{
  opacity: 1;
}

.content:hover .content-details{
  top: 50%;
  z-index: 6;
  opacity: 1;
}

</style>

 
 
 
