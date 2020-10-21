<template>
    <div id="edit-info">

        <!-- create new -->
        <v-row justify="end" class='ma-2'>
            <v-btn 
            outlined
            @click="addHeader()">
                <v-icon>mdi-plus</v-icon>
                Create New Section
            </v-btn>
        </v-row>

        <!--header-->
        <v-row 
        class="my-5 mx-1"
        justify="start">
            <h2>Sections ({{totalSections}})</h2>
        </v-row>

        <v-row>
            <v-col 
            cols="12" sm="3" md="4"
            v-for="heading of info"
            :key="heading.category">
                
                <v-card flat
                class="mx-auto mx-5"
                outlined 
                >
                    <v-card-title 
                    class="ma-2">
                        {{heading.category}} ({{heading.items.length}})
                            <v-spacer />
                            <v-btn
                            icon
                            @click="toggleShow(heading.category) "
                            >
                                <v-icon>
                                    {{ 
                                        show === heading.category
                                        ? 'mdi-close-circle-outline'  :'mdi-pencil-outline' 
                                    }}
                                </v-icon>
                            </v-btn>
                    </v-card-title>

                    <v-card-subtitle 
                    v-show="show !== heading.category"
                    class="ma-2">
                        <div
                        v-for="(item, i) of heading.items"
                        :key="heading.category + '-item' + i"
                        >
                            <p v-if="item.type.S==='images'">
                                {{item.label.S}}
                            </p>
                            <p v-else>
                                {{item.content.S}}
                            </p>
                        </div>
                    </v-card-subtitle>
            
                    <!-- EDIT BOX -->
                    <v-expand-transition>
                        <div 
                        v-show="show === heading.category">
                            <v-divider />
                            <v-flex class="pl-5 pr-5">

                                <!-- EDIT CATEGORY -->
                                <h5 class="pt-5 pb-5">EDIT CATEGORY NAME</h5>
                                <v-text-field
                                v-model="heading.category"
                                label="Name"
                                />

                                <v-divider />

                                <!-- EDIT CATEGORY ITEMS -->
                                <h5 class="pt-5 pb-5">EDIT ITEMS</h5>
                                <div
                                v-for="(item, j) of heading.items"
                                :key=j
                                class="item mb-5">

                                    <v-row>
                                        <v-col cols="1">
                                            <!-- delete item button -->
                                            <v-btn 
                                            small icon
                                            color="error"
                                            @click="deleteItem(i,j)">
                                                <v-icon >
                                                    mdi-delete
                                                </v-icon> 
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
                                    @change="onSelect(item.type.S, i, j)" />
                                    
                                    <!--edit item if icon-->
                                    <div v-if="item.type.S === 'icon'">

                                        <v-text-field
                                        v-model="item.content.S"
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
                                                class="noDecorationLink" href="https://materialdesignicons.com/">
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
                            @click="addItem(i)">
                                <v-icon small>mdi-plus</v-icon> 
                                Create New Item
                            </v-btn>
                            
                            <v-divider />
                            
                            <v-card-actions class="ma-2">
                                
                                <!-- delete section button -->
                                <v-btn 
                                color="error"
                                @click="deleteHeader(i)">
                                    Delete Section
                                </v-btn>
                                
                                <!-- apply changes button-->
                                <v-btn 
                                color="success" 
                                @click="updateItems(i)">
                                    Apply Changes
                                </v-btn>
                            </v-card-actions>
                        </div>
                    </v-expand-transition>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { ItemProvider, CategoryProvider } from '../../providers';

export default {
    components: {
    },
    data: function() {
        return {
            info: [],
            types: [
                "icon",
                "images",
                "simpleLink",
            ],
            show: "",
        }
    },
    async mounted() {
        let provider = new CategoryProvider();
        this.$data.info = await provider.getCategoryItems()
        return;
    },
    computed: {
        totalSections: function() {
            return this.$data.info.length
        }
    },
    methods: {
        toggleShow: function(category) {
            this.$data.show = (this.$data.show === category ? '' : category)
        },
        addItem: function(i) {
            let emptyItem = {
                type: {S: "icon"},
                id: {N: "UNKOWN"},
                content: {S: ""},
                externalUrl: {S: ""},
                icon: {S: ""},
            };
            this.$data.info[i].items.push(emptyItem);
        },
        onSelect: function(type, i, j) {
            let newItem = { type: {S: type}, id: {N: this.$data.info[i].items[j].id.N}};
            if (type === 'icon') {
                newItem.content = {S: ""};
                newItem.externalUrl = {S: ""};
                newItem.icon = {S: ""};
            } else  if (type === 'images') {
                this.$data.info[i].items[j].type.S = 'images';
                newItem.label = {S: ""};
                newItem.imageIds = {L: [{N : "1"}]};
                newItem.content = {S: "images"};
            } else if (type === 'simpleLink') {
                newItem.label = {S: ""};
                newItem.externalUrl = {S: ""};
            }
            this.$data.info[i].items.splice(j,1, newItem);
        },
        updateItems: function(i) {
            let category = {
                    name: this.$data.info[i].category,
                    items: [],
            };
            let itemProvider = new ItemProvider();
            for (let item of this.$data.info[i].items) {
                if (item.id.N !== 'UNKOWN') {
                    category.items.push(item.id.N);
                    itemProvider.updateItem(item.id.N, item);
                } else {
                    let id = this.newId();
                    item.id = {N: "" + id};
                    category.items.push("" + id);
                    itemProvider.updateItem(id, item);
                }
            }
            let categoryProvider = new CategoryProvider();
            categoryProvider.updateCateory(category);
        },
        newId: function() {
            let max = -1;
            for (let heading of this.$data.info) {
                for(let item of heading.items) {
                    if (parseInt(item.id.N) > max) {
                        max = parseInt(item.id.N);
                    }
                }
            }
            return max + 1;
        },
        deleteItem: function(i, j) {
            this.$data.info[i].items.splice(j, 1);
        },
        addHeader: function() {
            this.$data.info.push({
                category: '',
                items: [
                    {
                        type: {S: "icon"},
                        id: {N: "UNKOWN"},
                        content: {S: ""},
                        externalUrl: {S: ""},
                        icon: {S: ""}, 
                    }
                ],
            });
        },
        deleteHeader: function(i) {
            let category = this.$data.info[i].category;
            let items = this.$data.info[i].items;
            this.$data.info.splice(i, 1);
            let categoryProvider =  new CategoryProvider();
            categoryProvider.deleteCategory(category);
            let itemProvider = new ItemProvider();
            for(let item of items) {
                if( item.id.N !== "UNKNOWN") {
                    itemProvider.deleteItem(item.id.N);
                }
            }
        }
    }
}
</script>

<style scoped>

#edit-info {
    margin: 2.5% 5% 0% 5%
}

.noDecorationLink{
    text-decoration: none;
}

/* 
the treated tree

shallow rooted isolate trunk
sweats glistening beads from its sprinkler
green leaves in the valley
of burnt browns and drought yellows

sway in the wind of dust
cresting the natural hills
to buffet the synthetically
organic designer bark

nestled in a bed of mulch
a bed of stinky shit
dirty work to raise something successful 
in a valley that should be dead 

*/
</style>