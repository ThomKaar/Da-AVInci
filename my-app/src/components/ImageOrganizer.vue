
<template>
    <!-- eslint-disable -->
    <v-card raised
        class="mx-auto imageSelectCard"
        max-width="900"
        outlined>

    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1 title">Image Organizer</v-list-item-title>
        <v-chip-group
        column
        active-class="primary--text"
        >
        <v-chip v-for="(tag,i) in tags" :key="tag" v-on:click="changeActiveCollection(tag)">
          {{ tag }}
          <v-icon class="removeTag" v-on:click.prevent="removeTag(i)" x-small>mdi-close-circle-outline</v-icon>
        </v-chip>
        <v-btn class="addTag" x-small v-on:click.prevent="addTag()">
            <v-icon small>mdi-plus-thick</v-icon>
        </v-btn>
      </v-chip-group>
        
    </v-list-item-content>

    </v-list-item>
    <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-row
          v-for="j in Math.ceil(displayImages.length/4)"
          :key=j
          justify="start"
          class="grey lighten-5"
          style="height: 200px; margin-bottom: 5%;"
        >
            <v-card raised
              v-if="((j*4) == displayImages.length) || (j < displayImages.length/4)"
              v-for="(image, i) of displayImages.slice((j*4)-4, j*4)"
              :key="i"
              class="ma-4 pa-2 pictureCard"
              outlined
              tile
              v-on:click.prevent="makeActive(((j-1)*4)+i, activeCollection)"
            >              
              <v-img
              contain
              aspect-ratio=1
              max-height="130px"
              class="selectionImage"
              :src=image.url.S
              >
                  <v-icon v-if="image.collections.includes(activeCollection)" medium class="selectCheck">mdi-check-circle</v-icon>
              </v-img>
            </v-card>

            <v-card raised
              v-if="(((j-1)*4)+3) == displayImages.length"
              v-for="(image, i) of displayImages.slice((j-1)*4, ((j-1)*4)+3)"
              :key="i"
              class="ma-4 pa-2 pictureCard"
              id=""
              outlined
              tile
              v-on:click.prevent="makeActive(((j-1)*4)+i, activeCollection)"
            >
              <v-img
              contain
              aspect-ratio=1
              max-height="130px"
              class="selectionImage"
              :src=image.url.S
              >
                  <v-icon v-if="image.collections.includes(activeCollection)" medium class="selectCheck">mdi-check-circle</v-icon>
              </v-img>
            </v-card>

            <v-card raised
              v-if="(((j-1)*4)+2) == displayImages.length"
              v-for="(image, i) of displayImages.slice((j-1)*4, ((j-1)*4)+2)"
              :key="i"
              class="ma-4 pa-2 pictureCard"
              id=""
              outlined
              tile
              v-on:click.prevent="makeActive(((j-1)*4)+i, activeCollection)"
            >
              <v-img 
              contain
              aspect-ratio=1
              max-height="130px"
              class="selectionImage"
              :src=image.url.S
              >
                  <v-icon v-if="image.collections.includes(activeCollection)" medium class="selectCheck">mdi-check-circle</v-icon>
              </v-img>
            </v-card>

            <v-card raised
              v-if="(((j-1)*4)+1) == displayImages.length"
              v-for="(image, i) of displayImages.slice((j-1)*4, ((j-1)*4)+1)"
              :key="i"
              class="ma-4 pa-2 pictureCard"
              id=""
              outlined
              tile
              v-on:click.prevent="makeActive(((j-1)*4)+i, activeCollection)"
            >
              <v-img
              contain
              aspect-ratio=1
              max-height="130px"
              class="selectionImage"
              :src=image.url.S
              >
                  <v-icon v-if="image.collections.includes(activeCollection)" medium class="selectCheck">mdi-check-circle</v-icon>
              </v-img>
            </v-card>
          
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
          <v-row 
            justify="center"
            align="center">
            <v-btn class="confirmButton" v-on:click="updateCollections()">
              Confirm
            </v-btn>          
          </v-row>
      </v-col>
    </v-row>
  </v-container>
  </v-card>
</template>
<script>
import { ItemProvider } from '../providers';
import { ImageProvider } from '../providers'; 
export default {
    components: {
    },
    data: function() {
        return {
            tags: ['default'],
            displayImages: [],
            activeCollection: 'default',
        };
    },
    methods: {
        addTag: function() {
            this.$data.tags.push('yeet');
        },
        removeTag: function(i) {
            this.$data.tags.splice(i, 1);
        },
        makeActive: function(i, activeCollection) {
            if (this.$data.displayImages[i].collections.includes(activeCollection)) {
              let index = this.$data.displayImages[i].collections.indexOf(activeCollection);
              this.$data.displayImages[i].collections.splice(index, 1); 
            } else {
              this.$data.displayImages[i].collections.push(activeCollection);
            }
        },
        changeActiveCollection: function(collection) {
          this.$data.activeCollection = collection;
        },
        connectImagesToItems: function(items, images) {
          // Don't look at this ugly as heck code...
          // Three nested for loops ¯\_(ツ)_/¯
          for (let i = 0; i < items.length; i += 1) {
            this.tags.push(items[i].label.S);
            if (items[i].imageIds.L.length > 0) { 
              for (let j = 0; j < items[i].imageIds.L.length; j += 1) {
                for(let k = 0; k < images.length; k += 1) {
                  if(!images[k].collections) {
                    images[k].collections = [];
                  }
                  if (images[k].id.N == items[i].imageIds.L[j].N) {
                    images[k].collections.push(items[i].label.S);
                  }
                }
              }
            }
          }
          this.$data.displayImages = images;
        },
        loadImageContent: function() {
          let imageProvider = new ImageProvider();
          let itemProvider = new ItemProvider();
          imageProvider.getAllImages().then((images) => {
            itemProvider.getItemsByContent("images").then((items) => {
              this.connectImagesToItems(items, images);
            });  
          });
        },
        updateCollections: function() {
          let itemProvider = new ItemProvider();
          itemProvider.getItemsByContentAndLabel("images", this.$data.activeCollection).then((items) => {
            // Loop through each image and if the image has the activeCollection then we add the image's id to items[0].imageIds.L
            let imageIds = [];
            for (let i = 0; i < this.$data.displayImages.length; i += 1) {
              for(let j = 0; j < this.$data.displayImages[i].collections.length; j += 1) {
                if (this.$data.activeCollection == this.$data.displayImages[i].collections[j]) {
                  console.log("Found a selected image"); // eslint-disable-line
                  console.log(this.$data.displayImages[i].id); // eslint-disable-line
                  imageIds.push(this.$data.displayImages[i].id);
                }
              }
            }
            items[0].imageIds.L = imageIds;
            itemProvider.updateItem(items[0].id.N, items[0]);
          });  
        },
    },
   mounted() {
        this.loadImageContent();
    }
}
</script>
<style scoped>
.title {
  text-align: center;
}
.removeTag {
    margin-left: 5%;
}
.addTag {
    margin-top: auto;
    margin-bottom: auto;
}
.selectCheck {
    width: 100%;
    color: blue;
}
.confirmButton {
    width: 10%;
    margin: auto;
    text-align: auto;
}

.pictureCard {
  margin: auto;
  height: 80%;
  width: 20%;
}

.selectionImage {
  display: flex;
  align-items: center;
  height: auto;
  width: 100%;
}

h5 {
  text-align: center;
}

.textField {
  height: 10%;
}
</style>
