<template>
    <div id="edit-info">

        <!-- create new -->
        <v-row justify="end" class='ma-2'>
            <v-btn 
            outlined
            @click="addSection()">
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

        <!--sections-->
        <v-row>
            <v-col 
            cols="12" sm="3" md="4"
            v-for="(section,s) of info"
            :key="'section' + s">
                <InfoSection :section="info[s]" :s="s" />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { ItemProvider, CategoryProvider } from '../../providers';
import InfoSection from './infoSection';

export default {
    components: {
        InfoSection
    },
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