
<template>
  <!-- eslint-disable -->
  <v-container fluid> 
    
    <!--header-->
    <v-row 
    class="my-5 mx-1"
    justify="start">
      <h2>Gallery ({{totalImages}})</h2>
      <v-btn icon
      v-show="!editMode"
      @click="filter =''; editMode = true"
      >
        <v-icon>mdi-pencil-outline</v-icon>
      </v-btn>
      <v-btn text small
      class="mt-2"
      v-show="editMode"
      @click="editMode = false"
      > 
        <u>Stop Editing</u>
      </v-btn>
    </v-row>

    <!--filters-->
    <v-row
    v-show="!editMode"
    class="ma-1">
      <v-item-group>
        <v-btn disabled text>filter by</v-btn>
        <v-btn text 
        :color="filter == '' ? '#A15995' : ''"
        @click="filter = ''"> 
          all ({{totalImages}})
        </v-btn>
        <v-btn text
        v-for="tag in tags" 
        :key="'filterby:' +tag"
        :color="filter === tag ? '#A15995' : ''"
        @click="filter = tag"
        >
          {{tag}} ({{totalImagesByTag(tag)}})
        </v-btn>
      </v-item-group>
    </v-row>

    <!--edit-->
    <v-row 
    v-show="editMode"
    class="ma-0 fluid">

    <v-card
    outlined flat
    width="100%"
    class="px-5"
    >

      <v-card-title>
        <v-btn 
        x-large text disabled class='pb-1'>
          Collection
        </v-btn>
        <v-select
        class="mx-5"
        v-model="activeCollection"
        :items="tags"
        />
        <v-btn 
        x-large text disabled class='pb-1'>
          has {{totalImagesByTag(activeCollection)}} images.
        </v-btn>
      </v-card-title>

      <v-card-actions class="mx-5 mb-2">
        <v-btn 
        text small
        class="pa-0 ml-2"
        @click.prevent="removeTag(i)"
        >
          <v-icon color="error" x-small>mdi-delete</v-icon>
          <u>
          Delete Collection: 
          {{activeCollection}} ({{totalImagesByTag(activeCollection)}})
          </u>
        </v-btn>
        <v-spacer />
        <v-btn outlined 
          color="success"
          @click="updateCollections(); editMode=false">
            <v-icon>mdi-check-circle-outline</v-icon>
            Save Changes
          </v-btn> 
          <v-btn outlined 
          @click="editMode = false; activeCollection='default'">
            <v-icon medium>mdi-close-circle-outline</v-icon>
            Cancel Changes
          </v-btn>
      </v-card-actions>
    </v-card>
    </v-row>


    <!--image gallery -->
    <v-row>
      <v-col 
      class="d-flex child-flex"
      cols="4"
      v-for="(image, i) in filteredImages"
      :key="i">
      
        <v-card 
        class="mx-auto"
        outlined flat
        @click.prevent="makeActive(i, activeCollection)"
        >  
          <!--hidey div-->
          <v-row justify="center">

            <v-overlay
          :absolute="editMode"
          :value="image.collections.includes(activeCollection)"
          @click.prevent="makeActive(i, activeCollection)"
        >
        <v-icon large
              v-if="image.collections.includes(activeCollection)"  
              color="white">
                mdi-check-circle
              </v-icon>
          </v-overlay>

          

          <v-card-title>{{image.title.S}}</v-card-title>      
          <div class="d-flex flex-no-wrap justify-start mx-5 mb-5">
  
            <v-img
            max-width="250px"
            class="selectionImage"
            :src=image.url.S
            >
                
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
                    </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ItemProvider } from '../../providers';
import { ImageProvider } from '../../providers'; 

export default {
    components: {
    },
    data: function() {
        return {
            editMode: false,
            tags: ['default'],
            displayImages: [],
            activeCollection: 'default',
            rules: {
              required: value => !!value || 'Required',
            },
            newCategory: '',
            dialog: false,
            filter: ''
        };
    },
    computed: {
      totalImages: function() {
        return this.$data.displayImages.length
      },
      totalImagesByTag: function() {
        return tag => this.$data.displayImages.filter(el => el.collections.includes(tag)).length
      },
      filteredImages: function() {
        return this.$data.filter === '' ? this.$data.displayImages : 
          this.$data.displayImages.filter(el => el.collections.includes(this.$data.filter))
      },
      activeImages: function(){
          return this.$data.activeCollection === '' 
          ? this.$data.displayImages : 
          this.$data.displayImages.filter(el => el.collections.includes(this.$data.activeCollection))
      }
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

.textField {
  height: 10%;
}

</style>
