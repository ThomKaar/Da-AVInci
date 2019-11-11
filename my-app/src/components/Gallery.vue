 <template>
     <v-carousel>
      <v-carousel-item
        v-for="(image) in images"
        :key="image.src"
      >
        <v-row class="title-row"
        align="left"
        justify="left"
        >
            <p class="title-display">{{ image.title.toLowerCase() }}</p>
        </v-row>

        <img
        :src="image.src"
        class="displayImage"/>
      </v-carousel-item>
    </v-carousel>
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
        images: [
        ],
        }
    },
    async mounted() {
        this.$root.$on('updateGallery', async(imageIds) => {
            let imageProvider = new ImageProvider();
            let backendImages = await imageProvider.getImagesByCollection(imageIds.NS);
            let temp_images = [];
            for (let image of backendImages) {
                temp_images.push({
                    src: image.url.S,
                    title: image.title.S,
                });
            }
            this.images = temp_images;
            return;
        });
    }
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
}

.title-display:hover{
    color: #74b0f8;
}
.title-row {
    margin-left: 0%;
}


</style>

 
 
 
