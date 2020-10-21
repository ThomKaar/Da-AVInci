
<template>
    <!-- eslint-disable -->
    <div> 
    
    <v-row 
    class="ma-1"
    justify="start">
      <h2>Gallery</h2>
      <v-btn
      icon>
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
    </v-row>

    <v-row 
    v-show="true"
    class="ma-1">
      <!--active collections-->
      <h3>Collections</h3>
      <v-chip-group
      column
      active-class="primary--text"
      >
        <v-chip v-for="(tag,i) in tags" :key="tag" v-on:click="changeActiveCollection(tag)">
          {{ tag }}
          <v-icon class="removeTag" v-on:click.prevent="removeTag(i)" x-small>mdi-close-circle-outline</v-icon>
        </v-chip>
      </v-chip-group>

      <v-btn class="confirmButton" v-on:click="updateCollections()">
        Confirm
    </v-btn> 
    </v-row>

    <!--images -->
    <v-row>
      <v-col 
      class="d-flex child-flex"
      cols="4"
      v-for="(image, i) in displayImages"
      :key="i">
        <v-card 
          class="mx-auto">  
          <v-card-title>{{image.title.S}}</v-card-title>      
          <div class="d-flex flex-no-wrap justify-start mx-5 mb-5">
    
            <v-img
            max-width="250px"
            class="selectionImage"
            :src=image.url.S
            @click.prevent="makeActive(i, activeCollection)"
            >
                <v-icon v-if="image.collections.includes(activeCollection)" medium class="selectCheck">mdi-check-circle</v-icon>
            </v-img>
             
            <v-card-subtitle class="ml-2"> 
              <h4>Collections:</h4>
              <ul>
                <li
                 v-for="collection in image.collections"
                 :key="collection +'-image' + i ">
                 {{collection}}
                 </li>
              </ul>
            </v-card-subtitle>
          </div>
        </v-card>
      </v-col>
    </v-row>
    </div>
</template>
<script>
import { ItemProvider } from '../../providers';
import { ImageProvider } from '../../providers'; 
export default {
    components: {
    },
    data: function() {
        return {
            tags: ['default'],
            displayImages: [],
            activeCollection: 'default',
            rules: {
              required: value => !!value || 'Required',
            },
            newCategory: '',
            dialog: false,
        };
    },
    methods: {
        addTag: function(newCategory) {
            if (newCategory !== '') {
              // Add it to the UI
              this.$data.tags.push(newCategory);
              this.$data.newCategory = '';
              this.$data.dialog = false;
              // Create a new item with the type.S = 'images' and label.S = given string
              let itemProvider = new ItemProvider(); // eslint-disable-line
              itemProvider.findNewId().then((newId) => {
                let item = {
                  id: {
                    N: "" + newId,
                  },
                  label: {
                    S: newCategory,
                  },
                  type: {
                    S: "images",
                  },
                  content: {
                    S: "images",
                  },
                };
                itemProvider.updateItem(newId, item);
              });
            }
            
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
