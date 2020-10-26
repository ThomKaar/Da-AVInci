<template>
  <v-container fluid> 
    
    <!--header-->
    <v-row 
    class="my-5 mx-1"
    justify="start">
      <h2>Gallery ({{totalImages}})</h2>
      <v-spacer />

      <v-btn 
      text small
      @click="filter =''; editMode = !editMode; createMode=false"
      >
        <v-icon small class="mr-2">
          {{editMode ? 'mdi-close' : 'mdi-pencil-outline'}}
        </v-icon>
        Edit Collections
      </v-btn>
      <v-btn 
      text small
      @click="filter =''; createMode=!createMode; editMode=false"
      >
        <v-icon small class="mr-2">
          {{createMode ? 'mdi-close' : 'mdi-plus'}}
        </v-icon>
        Add Collection
      </v-btn>
    </v-row>

    <!--create tag -->
    <v-row 
    v-show="createMode" 
    class="ma-1 fluid" 
    justify="end">
      <v-card flat width="50%" >
        <v-card-title>
          <v-text-field
          class="mx-2"
          v-model="newCollection"
          label="New collection name"
          />
          <v-btn outlined  small
          class="mx-2"
          color="success" 
          :disabled="newCollection===''"
          @click="addTag()">
            Create
          </v-btn>
          <v-btn icon small
          class="ml-5"
          @click="newCollection=''; createMode=false ">
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-row>

    <!--edit-->
    <v-row 
    v-show="editMode"
    justify="end"
    class="ma-1 fluid">
      <v-card flat width="60%">
        <v-card-title>
          <v-select
          class="mx-2"
          v-model="activeCollection"
          label="Select a collection"
          no-data-text="No collections yet - Go make one!"
          :messages="`Collection ${activeCollection.label} has ${totalImagesByTag(activeCollection)} images.`"
          :items="tags"
          item-text="label"
          item-value="id"
          return-object
          />
          <v-btn outlined small
          :disabled="isEmpty(activeCollection)"
          color="success"
          class="mx-2"
          @click="updateCollection(); editMode=false">
            Save Changes
          </v-btn> 
          <v-btn outlined small
          :disabled="isEmpty(activeCollection)"
          color="error"
          class="mx-2"
          @click.prevent="removeTag()"
          >
            Delete Collection
          </v-btn>
          <v-btn icon small
          class="ml-5"
          @click="editMode = false; activeCollection={}">
            <v-icon medium>mdi-close-circle-outline</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-row>

    <!--filters-->
    <v-row
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
        :key="'filterby:' +tag.label"
        :color="filter === tag.label ? '#A15995' : ''"
        @click="filter = tag.label"
        >
          {{tag.label}} ({{totalImagesByTag(tag)}})
        </v-btn>
      </v-item-group>
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
              />
              
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
            rules: {
              required: value => !!value || 'Required',
            },
            tags: [],
            images: [],
            editMode: false,
            activeCollection: {},
            createMode: false,
            newCollection: '',
            filter: ''
        };
    },
    computed: {
      isEmpty: function() {
        return obj => Object.keys(obj).length === 0
      },
      totalImages: function() {
        return this.$data.images.length
      },
      totalImagesByTag: function() {
        return tag => this.$data.images.filter(el => el.collections.includes(tag.label)).length
      },
      filteredImages: function() {
        return this.$data.filter === '' ? this.$data.images : 
          this.$data.images.filter(el => el.collections && el.collections.includes(this.$data.filter))
      },
      activeImages: function(){
          return this.$data.activeCollection === ''
          ? this.$data.images 
          : this.$data.images.filter(el =>
             el.collections.includes(this.$data.activeCollection))
      }
    },
    methods: {
        addTag: function() {
          let itemProvider = new ItemProvider();
          let newTag = this.$data.newCollection;
          itemProvider.findNewId().then((newId) => {
            let item = {
              id: {
                N: `${newId}`,
              },
              label: {
                S: newTag,
              },
              type: {
                S: "images",
              },
              content: {
                S: "images",
              },
              imageIds: {
                L: []
              }
            };
            itemProvider.updateItem(newId, item);
            this.$data.tags.push({
              label: newTag,
              id: newId
            });
          });
        
          this.$data.newCollection = ""
          this.$data.createMode = false;
        },
        removeTag: function() {
            let tag = this.$data.activeCollection;
            let msg = `Are you sure you want to delete ${tag.label}?`;

            if (confirm(msg)){
              let itemProvider = new ItemProvider();
              itemProvider.deleteItem(tag.id);
              this.$data.tags = this.$data.tags
                .filter(t => t.label !== tag.label)
              this.$data.activeCollection = {}
              this.$data.editMode = false;
            }
        },
        makeActive: function(i) {
          let activeCollection = this.$data.activeCollection;

          if (Object.keys(activeCollection).length === 0)
            return;

          if (this.$data.images[i].collections.includes(activeCollection.label)) {
            let index = this.$data.images[i].collections.indexOf(activeCollection.label);
            this.$data.images[i].collections.splice(index, 1)
          } 
          else {
            this.$data.images[i].collections.push(activeCollection.label);
          }
        },
        connectImagesToItems: function(items, images) {
          // Don't look at this ugly as heck code...
          // Three nested for loops ¯\_(ツ)_/¯
          let totalImgs = images.length;

          items.forEach(item => {
            //create all tags
            this.tags.push({
              label: item.label.S,
              id: item.id.N
            })
            //add collection to images by Id
            if (item.imageIds.L.length > 0 ){
              item.imageIds.L.forEach(id => {
                for (let i=0; i<totalImgs; i++) {
                  if (id.N === images[i].id.N)
                    images[i].collections.push(item.label.S)
                }
              })
            }
          })
          this.$data.images = images;
        },
        loadImageContent: function() {
          // get images, items and attach collections
          let imageProvider = new ImageProvider();
          let itemProvider = new ItemProvider();
          imageProvider.getAllImages().then((images) => {
            images = images.map(img => ({...img, collections: []}))
            itemProvider.getItemsByContent("images").then((items) => {
              this.connectImagesToItems(items, images);
            });  
          });
        },
        updateCollection: function() {
          let collection = this.$data.activeCollection.label

          let itemProvider = new ItemProvider();
          itemProvider.getItemsByContentAndLabel("images", collection)
            .then((items) => {
              // Loop through each image and if the image has the activeCollection then we add the image's id to items[0].imageIds.L
              let imageIds = [];
              this.$data.images.forEach(image => {
                if (image.collections.includes(collection))
                  imageIds.push(image.id)
              })

              items[0].imageIds.L = imageIds;
              itemProvider.updateItem(items[0].id.N, items[0]);
            })
        }
    },
   mounted() {
        this.loadImageContent();
    }
}
</script>

<style scoped>
.selectionImage {
  display: flex;
  align-items: center;
  height: auto;
  width: 100%;
}


</style>
