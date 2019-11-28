<template>
    <div id="listEdit">
        <h1 class="title"> {{ type }} </h1>
        <ul class="unorderedList">
            &nbsp;
            <li v-for="(heading, i) of info"
            v-bind:key="i"
            class="listItem">

            <div class="editField">
                <EditSubItem
                    v-bind:value="heading.category"
                    v-bind:index="i"
                    label="Heading">
                </EditSubItem>

                <button class="editButton" v-on:click="updateHeading()">
                    <v-icon x-small>mdi-cached</v-icon>
                </button>
                <button class="editButton" v-on:click.prevent="removeHeading(i)">
                    <v-icon x-small>mdi-delete</v-icon>
                </button>
            </div>
            
            <EditItem
                v-bind:subItems="heading.items">
            </EditItem>        
            </li>
        </ul>
        <div class="bottomButton">
            <v-btn v-on:click="createHeading">
                <v-icon small>mdi-plus-thick</v-icon>
                Add Heading
            </v-btn>
            <v-btn v-on:click="updateContent">
                <v-icon small>mdi-cached</v-icon>
                Update Content
            </v-btn>
        </div>
  </div>
</template>

<script>
import EditItem from './EditItem';
import EditSubItem from './EditSubItem';
import { CategoryProvider } from '../providers';
export default {
    components: {
        EditItem,
        EditSubItem,
    },
    props: [
        'type',
    ],
    data() {
        return {
            info: []
        }
    },
    async mounted() {
        var provider = new CategoryProvider();
        this.info = await provider.getCategoryItems();    
    },
    methods: {
        createHeading: function() {
            let newHeading = {
                category: "",
                items: [{                
                    content: {
                        S: "filler"
                    },
                    id: {
                        N: ""
                    },
                    label: {
                        S: "externalUrl"
                    },
                    imageIds: {
                        NS: ["replace me"],
                    },
                    externalUrl: {
                        S:  ""
                    }
                }],
            };
            this.$data.info.push(newHeading);
        },
        updateContent: function() {
            let categories = [];
            for (let heading of this.$data.info){
                categories.push({
                    category: {
                        S: heading.category}
                    });
            }
        },
        removeHeading: function(i) {
            this.info.splice(i, 1);
        },
        updateHeading: function() {
            return;
        }
    },
}
</script>
<style scoped>
#listEdit {
    width: 80%;
    height: auto;
    margin-bottom: auto;
    margin-left: auto;
    margin-right: auto;
    height: 140em;
    background-color:azure;
}
.title {
    margin: auto;
    text-align: center;
}
.editField {
    max-height: 30%;
    width: 90%;
    font-size: 16px;
    list-style: none;
    float: left;
}
.listItem {
    list-style: none;
    display: block;
    background-color:azure;
}
.unorderedList {
     background-color:azure;
     height: 140em;
}
.editButton {
    margin-right: 15%;
    float: left;
    height: 18px;
    border-radius: 4px;

}
.bottomButton {
    margin: auto;
    width: 20%;
}
</style>
