 <template>
    <div>
        <v-carousel>
            <v-carousel-item
                v-for="(image) of images"
                :key="image.url.S"
            >
                
                <v-row class="title-row"
                >
                    <p class="title-display">{{ image.title.S.toLowerCase() }}</p>
                </v-row>
                <v-img
                    contain
                    max-height="475px"
                    aspect-ratio=1
                    :src=image.url.S
                    >
                </v-img>
            </v-carousel-item>
        </v-carousel>
        
    </div>
</template>
<script>
import { ImageProvider } from '../providers';
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
            console.log("images") // eslint-disable-line
            console.log(this.$data.images); // eslint-disable-line
        });
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


</style>

 
 
 
