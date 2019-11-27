<template>
    <div>
        <v-card raised
            class="mx-auto ma-5"
            max-width="600"
            outlined 
            v-for="(heading, i) of info"
            v-bind:key=i>
            <v-card-title>
                <v-text-field
                class="editField"
                v-model="heading.category"
                outlined>
                    <template v-slot:label>
                        {{ "Category " + i}}
                    </template>
                </v-text-field>
            </v-card-title>
            <v-card-actions class="ma-2">
                    <v-flex class="pa-1">
                        <div
                            v-for="(item, j) of heading.items"
                            v-bind:key=j>

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
                                    class="editField"
                                    v-model="item.icon.S"
                                    outlined>
                                        <template v-slot:label>
                                            {{ "Icon"}}
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
                        </div>
                    </v-flex>
            </v-card-actions>
            <v-btn class="addButton" color="#29B6" v-on:click="addItem(i)">
                add item
            </v-btn>
        </v-card>
    </div>
</template>
<script>
import { CategoryProvider } from '../providers';
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
            if (type === 'icon') {
                this.$data.info[i].items[j].type.S = 'icon';
                this.$data.info[i].items[j].content = {S: ""};
                this.$data.info[i].items[j].externalUrl = {S: ""};
                this.$data.info[i].items[j].icon = {S: ""};
            } else  if (type === 'images') {
                this.$data.info[i].items[j].type.S = 'images';
                this.$data.info[i].items[j].label = {S: ""};
                this.$data.info[i].items[j].imageIds = {L: []};
            } else if (type === 'simpleLink') {
                this.$data.info[i].items[j].type.S = 'simpleLink';
                this.$data.info[i].items[j].label = {S: ""};
                this.$data.info[i].items[j].externalUrl = {S: ""};
            }
        }
    }
}
</script>
<style scoped>
.addButton {
    width: 20%;
    margin-left: 40%;
    margin-right: 40%;
    margin-bottom: 4%;
}
</style>