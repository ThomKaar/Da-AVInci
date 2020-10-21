<template>
    <div id="edit-info">
        <v-row>
            <v-col cols="12" sm="3" md="4"
             v-for="(heading, i) of info"
            v-bind:key=i>
                
                <v-card flat
                    class="mx-auto ma-5"
                    max-width="600"
                    outlined 
                >
            <v-card-title class="ma-2">
                {{heading.category}} ({{heading.items.length}})
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        @click="show = !show"
                    >
                        <v-icon>{{ show ? 'mdi-close-circle-outline'  :'mdi-pencil-outline' }}</v-icon>
                    </v-btn>
            </v-card-title>
            <v-card-subtitle >
                <div
                v-for="(item) of heading.items"
                :key="item"
                >
                    <p v-if="item.label">{{item.label}}</p>
                    <p v-if="item.content">{{item.content}}</p>
                </div>
            </v-card-subtitle>
    
            <v-expand-transition>
                <div v-show="show">
                    <v-divider></v-divider>
                    <v-flex class="pa-1">
                        <v-text-field
                class="editField"
                v-model="heading.category"
                outlined>
                    <template v-slot:label>
                        {{ "Category " + i}}
                    </template>
                </v-text-field>
                        <div
                            v-for="(item, j) of heading.items"
                            v-bind:key=j
                            class="item">

                            <v-select v-model="item.type.S" :items="types" label="Item Type" v-on:change="onSelect(item.type.S, i, j)"></v-select>
                            
                            <div v-if="item.type.S === 'icon'">
                                <v-text-field
                                    class="editField"
                                    v-model="item.content.S"
                                    outlined>
                                        <template v-slot:label>
                                            {{ "Item " + j}}
                                        </template>
                                </v-text-field>
                                <v-text-field
                                    class="editField"
                                    v-model="item.externalUrl.S"
                                    outlined>
                                        <template v-slot:label>
                                            {{ "Link to "}}
                                        </template>
                                </v-text-field>
                                <v-text-field
                                    class="mb-2 editField"
                                    v-model="item.icon.S"
                                    id="iconField"
                                    outlined>
                                        <template v-slot:label>
                                            {{ "Icon"}}
                                        </template>
                                        <template v-slot:append-outer>
                                             <a class="noDecorationLink" href="https://materialdesignicons.com/">
                                             <v-icon >mdi-help-circle-outline</v-icon>
                                             </a>
                                        </template>
                                </v-text-field>
                            </div>

                            <div v-if="item.type.S === 'images'"> 
                                <v-text-field
                                    class="editField"
                                    v-model="item.label.S"
                                    outlined>
                                        <template v-slot:label>
                                            {{ "Item " + j}}
                                        </template>
                                </v-text-field>
                            </div>

                            <div v-if="item.type.S === 'simpleLink'">
                                <v-text-field
                                    class="editField"
                                    v-model="item.label.S"
                                    outlined>
                                        <template v-slot:label>
                                            {{ "Item " + j}}
                                        </template>
                                </v-text-field>

                                <v-text-field
                                    class="editField"
                                    v-model="item.externalUrl.S"
                                    outlined>
                                        <template v-slot:label>
                                            {{ "url "}}
                                        </template>
                                </v-text-field>
                            </div>
                            <v-btn v-on:click="deleteItem(i,j)">
                                <v-icon small>mdi-delete</v-icon>
                            </v-btn>
                        </div>
                    </v-flex>

                        <v-btn class="editButton" color="#29B6" v-on:click="addItem(i)">
                    add item
                    </v-btn>
                    
                <v-btn class="editButton" color="#29B6" v-on:click="updateItems(i)">
                    apply changes
                </v-btn>
                <v-btn class="deleteButton" v-on:click="deleteHeader(i)">
                    delete section
                </v-btn>
                </div>
                </v-expand-transition>
        </v-card>

            </v-col>
        </v-row>
        
        <div class="belowCard">
            <v-btn class="editButton" color="#29B6" v-on:click="addHeader()">
            Create Section
            </v-btn>
        </div>
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
            show: false,
        }
    },
    async mounted() {
        let provider = new CategoryProvider();
        this.$data.info = await provider.getCategoryItems();
        return;
    },
    methods: {
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