<template>
   <v-card flat
   class="mx-auto mx-5"
   outlined 
   >
      <!--section title - always showing-->
      <v-card-title class="ma-2">

         {{section.category}} ({{section.items.length}})
         <v-spacer />

         <!-- edit section button -->
         <v-btn icon
         @click="toggleShow(s)"
         >
            <v-icon>
               {{ show === s 
               ? 'mdi-close-circle-outline' : 'mdi-pencil-outline' 
               }}
            </v-icon>
         </v-btn>

         <!-- delete section button -->
         <v-btn
         icon
         :disabled="show === s"
         color="error"
         @click="deleteSection(s)"
         >
            <v-icon>mdi-delete</v-icon>
         </v-btn>
      </v-card-title>

      <!--section info - dont show during edit-->
      <v-card-subtitle 
      v-show="show !== s"
      class="ma-2">
         <div
         v-for="(item, i) of section.items"
         :key="section.category + '-item' + i"
         >
            <p>
               <v-icon small class="mb-1 mr-1">
                  {{item.icon.S}}
               </v-icon>
               {{item.label.S}}
            </p>
         </div>
      </v-card-subtitle>

      <!-- section edit - show only during edit -->
      <v-expand-transition>
         <div v-show="show === s">
            <v-divider />
            <v-flex class="pl-5 pr-5">

               <!-- EDIT CATEGORY -->
               <h5 class="pt-5 pb-5">EDIT CATEGORY NAME</h5>
               <v-text-field
               v-model="section.category"
               label="Name"
               />

               <v-divider />

               <!-- EDIT CATEGORY ITEMS -->
               <h5 class="pt-5 pb-5">EDIT ITEMS</h5>
               <div
               v-for="(item, j) of info[s].items"
               :key=j
               class="item mb-5">

                  <v-row>
                     <v-col cols="1">

                        <!-- delete item button -->
                        <v-btn 
                        small icon
                        color="error"
                        @click="deleteItem(s,j)">
                           <v-icon >mdi-delete</v-icon> 
                        </v-btn>
                     </v-col>
                                                                                                   <v-col >
                        <!-- item index -->
                        <h4 class="pt-1">
                           {{"ITEM NO." + j}}
                        </h4>
                     </v-col>
                  </v-row>

                  <!--select item type-->
                  <v-select 
                  v-model="item.type.S" 
                  :items="types" 
                  label="Type" 
                  @change="onSelectType(item.type.S, s, j)" />
                  
                  <!--edit item if icon-->
                  <div v-if="item.type.S === 'icon'">

                     <v-text-field
                     v-model="item.label.S"
                     label="Name"
                     />

                     <v-text-field
                     v-model="item.externalUrl.S"
                     label="Link"
                     />
                     <v-text-field
                     class="mb-2"
                     v-model="item.icon.S"
                     label="icon"
                     >
                        <template v-slot:append-outer>
                           <a 
                           class="noDecorationLink" 
                           target="_blank"
                           href="https://materialdesignicons.com/">
                                 <v-icon>
                                    mdi-help-circle-outline
                                 </v-icon>
                           </a>
                        </template>
                     </v-text-field>
                  </div>

                  <!-- edit images item -->
                  <div v-if="item.type.S === 'images'"> 
                     <v-text-field
                     v-model="item.label.S"
                     label="Name"
                     />
                  </div>

                  <!-- edit link item -->
                  <div v-if="item.type.S === 'simpleLink'">
                     <v-text-field
                     v-model="item.label.S"
                     label="Name"
                     />

                     <v-text-field
                     v-model="item.externalUrl.S"
                     label="URL"
                     />
                  </div>

               </div>
            </v-flex>

            <!-- add new item button-->
            <v-btn 
            class="ml-5 mb-10" 
            outlined
            @click="addItem(s)">
               <v-icon small>mdi-plus</v-icon> 
               Add Item
            </v-btn>
            
            <v-divider />
            
            <v-card-actions class="ma-2">
               
               <!-- cancel changes button-->
               <v-btn 
               color="error"
               @click="show = -1">
                  Cancel
               </v-btn>
               
               <!-- apply changes button-->
               <v-btn 
               color="success" 
               :disabled="section.category === ''"
               @click="updateItems(s); show=-1">
                  Save
               </v-btn>

            </v-card-actions>
         </div>
      </v-expand-transition>
   </v-card>
</template>

<script>
import { ItemProvider, CategoryProvider } from '../../providers';

export default {
    components: {},
    props: ["section", "s"],
    data: function() {
        return {
            info: [],
            types: [
                "icon",
                "images",
                "simpleLink",
            ],
            show: -1,
        }
    },
    async mounted() {
        let provider = new CategoryProvider();
        this.$data.info = await provider.getCategoryItems()
        provider.getCategoryItems().then(res => {
            console.log("got em")  //eslint-disable-line
            console.log(res) //eslint-disable-line
        })
    },
    computed: {
        totalSections: function() {
            return this.$data.info && this.$data.info.length
        }
    },
    methods: {
        toggleShow: function(cat_index) {
            this.$data.show = (this.$data.show === cat_index ? -1 : cat_index)
        },
        addItem: function(s) {
            // add new empty item to section
            let newItem = {
                type: {S: "icon"},
                id: {N: "UNKNOWN"},
                externalUrl: {S: ""},
                icon: {S: ""},
                label: {S: ""}
            };
            this.$data.info[s].items.push(newItem);
        },
        onSelectType: function(type, i, j) {
            // change type of item

            let currItem = this.$data.info[i].items[j];

            console.log("onselect - type = " + type) //eslint-disable-line

            let newItem = { 
                type: {S: type}, 
                id: {N: currItem.id.N},
                label: {S: ""},
                externalUrl: {S: ""},
                icon: {S: ""}
            };

            if (type === 'images') {
                newItem.imageIds = {L: [{N : "1"}]};
            } 

            this.$data.info[i].items.splice(j,1, newItem);
        },
        updateItems: function(i) {
            // save item changes in a given section
            let itemProvider = new ItemProvider();
            let categoryProvider = new CategoryProvider();

            let category = {
                name: this.$data.info[i].category,
                items: []
            }

            this.$data.info[i].items.forEach(item => {
                if (item.id.N === "UNKNOWN") 
                    item.id.N = `${this.newId()}`;
                category.items.push(item.id.N)
                itemProvider.updateItem(item.id.N, item);
            }); 

            categoryProvider.updateCategory(category);
        },
        newId: function() {
            // creates new id
            let max = -1;
            for (let section of this.$data.info) {
                for(let item of section.items) {
                    if (parseInt(item.id.N) > max) {
                        max = parseInt(item.id.N);
                    }
                }
            }
            return max + 1;
        },
        deleteItem: function(i, j) {
            // remove item from section
            this.$data.info[i].items.splice(j, 1);
        },
        addSection: function() {
            // creates new empty section
            this.$data.info.push({
                category: '',
                items: [],
            });

            this.$data.show = this.$data.info.length -1
        },
        deleteSection: function(i) {
            // deletes a section
            let categoryProvider =  new CategoryProvider();
            let itemProvider = new ItemProvider();

            let category = this.$data.info[i].category;
            let items = this.$data.info[i].items;
            this.$data.info.splice(i, 1);
            
            categoryProvider.deleteCategory(category);
            
            items.forEach(item => {
                if( item.id.N !== "UNKNOWN") 
                    itemProvider.deleteItem(item.id.N);
            })
        }
    }
}
</script>

<style scoped></style>