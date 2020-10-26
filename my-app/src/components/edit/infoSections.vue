<template>
    <!--sections-->
    <v-row>
        <v-col 
        cols="12" sm="3" md="4"
        v-for="(section,s) of info"
        :key="'section' + s"
        >
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
                        {{ show === s ? 'mdi-close-circle-outline' : 'mdi-pencil-outline' }}
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

                <!--section sectiondont show during edit-->
                <v-card-subtitle 
                v-show="show !== s"
                class="ma-2"
                >
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
                            :disabled="section.category === 'about' || section.category === 'contact'"
                            />

                            <v-divider />

                            <!-- EDIT CATEGORY ITEMS -->
                            <h5 class="pt-5 pb-5">EDIT ITEMS</h5>
                            <div
                            v-for="(item, j) of section.items"
                            :key=j
                            class="item mb-5">

                                <v-row>
                                    <v-col >
                                        <!-- item index -->
                                        <h4 class="pt-1">
                                            {{"ITEM NO." + j}}
                                        </h4>
                                    </v-col>
                                    <v-col cols="1">
                                        <!-- delete item button -->
                                        <v-btn 
                                        small icon
                                        color="error"
                                        @click="deleteItem(s,j)">
                                            <v-icon >mdi-delete</v-icon> 
                                        </v-btn>
                                    </v-col>
                                </v-row>

                                <!--select item type-->
                                <v-select 
                                v-model="item.type.S" 
                                :items="types" 
                                label="Type" 
                                @change="onSelectType(item.type.S, s, j)" 
                                />
                                
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
                                    <v-select
                                    :items="collections"
                                    v-model="item.label.S"
                                    label="Select a collection"
                                    no-data-text="No collections yet!"
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
                        text small
                        class="ml-5 mb-10" 
                        @click="addItem(s)">
                            <v-icon small class="mr-2">mdi-plus</v-icon> 
                            Add Item
                        </v-btn>
                        <v-divider />
        
                        <v-card-actions class="ma-2">
                            <v-spacer />
                            <!-- apply changes button-->
                            <v-btn outlined
                            color="success" 
                            :disabled="section.category === ''"
                            @click="updateItems(s); show=-1">
                                Save
                            </v-btn>
                            <!-- cancel changes button-->
                            <v-btn outlined
                            color="error"
                            @click="cancelChanges(s)">
                                Cancel
                            </v-btn> 
                        </v-card-actions>
                    </div>
                </v-expand-transition>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>
import { ItemProvider, CategoryProvider } from '../../providers';

export default {
    components: { },
    data: function() {
        return {
            types: [
                "icon",
                "images",
                "simpleLink",
            ],
            info: [],
            tags: [],
            show: -1,
            maxId: 0,
        }
    },
    async mounted() {
        let categoryProvider = new CategoryProvider();
        let itemProvider = new ItemProvider();

        await itemProvider.getItemsByContent("images")
            .then(items => {
                this.$data.tags = items.map(item => {
                    if (parseInt(item.id.N) > this.$data.maxId)
                        this.$data.maxId = parseInt(item.id.N)
                    return item.label.S
                })
                categoryProvider.getCategoryItems().then(info => {
                    this.$data.info = info;
                })
            })
    },
    computed: {
        collections: function() {
            return this.$data.tags
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
                label: {S: ""},
                content: {S: "icon"}
            };
            this.$data.info[s].items.push(newItem);
        },
        onSelectType: function(type, i, j) {
            // change type of item
            let currItem = this.$data.info[i].items[j];
            let newItem = { 
                type: {S: type}, 
                id: {N: currItem.id.N},
                label: {S: ""},
                externalUrl: {S: ""},
                icon: {S: ""},
                content: {S: type}
            };

            if (type === 'images') 
                newItem.imageIds = {L: []};

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
            this.$emit('update', this.$data.info.length)
        },
        newId: function() {
            // creates new id
            let max = this.$data.maxId;
            for (let section of this.$data.info) {
                for(let item of section.items) {
                    if (parseInt(item.id.N) > max) 
                        max = parseInt(item.id.N);
                }
            }
            return max + 1;
        },
        deleteItem: function(i, j) {
            // remove item from section
            this.$data.info[i].items.splice(j, 1);
        },
        cancelChanges: function(s) {
            this.$data.show = -1;
            if (this.$data.info[s].category === "" 
                || this.$data.info[s].items.length === 0)
                this.$data.info.splice(s,1)
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
            let msg = `Are you sure you want to delete section ${this.$data.info[i].category} and ${this.$data.info[i].items.length} items?`

            if (!confirm(msg))
                return;

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

<style scoped>
.noDecorationLink {
    text-decoration: none;
}
</style>

