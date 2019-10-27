 <template>
     <v-carousel>
      <v-carousel-item
        v-for="(image, i) in images"
        :key="image.src"
      >
        <v-img
        :src="image.src">
        </v-img>
        <v-row
        class="fill-height"
        align="center"
        justify="center"
        >
            <div class="display-3">Slide {{ i + 1 }}</div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
</template>
<script>
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
            { src: 'https://www.highreshdwallpapers.com/wp-content/uploads/2011/09/Large-Format-HD-Wallpaper.jpg' },
            { src: 'https://tse1.mm.bing.net/th?id=OIP.-3bp4fl8rLnO8_NqwrgyQQHaED&pid=Api&P=0&w=357&h=196' },
            { src: 'https://www.highreshdwallpapers.com/wp-content/uploads/2011/09/Large-Format-HD-Wallpaper.jpg' },
            { src: 'https://tse1.mm.bing.net/th?id=OIP.-3bp4fl8rLnO8_NqwrgyQQHaED&pid=Api&P=0&w=357&h=196' },
        ]
        }
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
</style>

 
 
 
