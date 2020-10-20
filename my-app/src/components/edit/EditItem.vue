<template>
  <div id="editItem">
      <form>
        <ul class="subItem">
            <li v-for="(subItem, i) of subItems"
            v-bind:key="i">
                <!-- Label under the headings -->
                <div class="itemDiv">
                    <div v-if="subItem.label">
                        <EditSubItem
                            v-bind:value="subItem.label.S"
                            v-bind:index="i"
                            label="item">
                        </EditSubItem>

                        <div v-if="(i+1) != subItems.length">
                            <button   class="editButton" v-on:click.prevent="updateContent">
                                <v-icon x-small>mdi-cached</v-icon>
                            </button>
                            <button   class="editButton" v-on:click.prevent="removeItemContent(i)">
                                <v-icon x-small>mdi-delete</v-icon>
                            </button>
                        </div>

                        <div v-if="(i+1) == subItems.length">
                            <button class="editButton" v-on:click.prevent="updateContent">
                                <v-icon x-small>mdi-cached</v-icon>
                            </button>
                            <button   class="editButton" v-on:click.prevent="removeItemContent(i)">
                                <v-icon x-small>mdi-delete</v-icon>
                            </button>
                            <button   class="editButton" v-on:click.prevent="createItemContent(i)">
                                <v-icon x-small>mdi-plus-thick</v-icon>
                            </button>  
                        </div>
                    </div>
                </div>
                
                <!-- ImageIds -->
                <div v-if="subItem.imageIds" class="itemDiv">
                    <ul>
                        <li v-for="(j, k) of subItem.imageIds.NS"
                            v-bind:key="j"
                            class="listItem">
                            <EditSubItem 
                                v-bind:value="subItem.imageIds.NS[j-1]"
                                v-bind:index="j"
                                label="image id ">
                            </EditSubItem>

                            <div v-if="k == subItem.imageIds.NS.length-1">
                                <button class="editButton" v-on:click="updateContent">
                                    <v-icon x-small>mdi-cached</v-icon>
                                </button>
                                <button   class="editButton" v-on:click.prevent="removeImageId(i, j-1)">
                                    <v-icon x-small>mdi-delete</v-icon>
                                </button>
                                <button   class="editButton" v-on:click.prevent="createImageId(i)">
                                    <v-icon x-small>mdi-plus-thick</v-icon>
                                </button>  
                            </div>
                        </li>
                    </ul>
                    
                </div>

                <!-- External URLS -->
                <div v-if="subItem.externalUrl" class="itemDiv">
                    <div class="itemDiv" v-if="subItem.icon">
                        <EditSubItem
                            v-bind:value="subItem.icon.S"
                            label="icon"
                            v-bind:index="i">
                        </EditSubItem>

                        <button class="editButton" v-on:click="updateContent">
                            <v-icon x-small>mdi-cached</v-icon>
                        </button>
                        <button   class="editButton" v-on:click.prevent="removeItemContent(i)">
                            <v-icon x-small>mdi-delete</v-icon>
                        </button>                       
                    </div>
                    
                    <div class="innerField">
                        <EditSubItem
                            v-bind:value="subItem.externalUrl.S"
                            label="url"
                            index="">
                        </EditSubItem>
                    </div>
                    <!-- name of social media accounts -->
                    <div v-if="subItem.content && subItem.content.S != 'internal'" class="innerField">
                        <EditSubItem
                            v-bind:value="subItem.content.S"
                            index=""
                            label="content">
                        </EditSubItem>
                    </div>
                </div>
            </li>
        </ul> 
      </form>
  </div>
</template>

<script>
import EditSubItem from './EditSubItem';
export default {
    components: {
        EditSubItem,
    },
    props: [
        'type',
        'currentHeading',
        'subItems',
    ],
    methods: {
        removeItemContent: function(i) {
            this.subItems.splice(i, 1);
        },
        updateContent: function() {
            return;
        },
        createItemContent: function() {
            this.subItems.push({
                externalUrl: {
                    S:  "https://insertUrl.com",
                },
                content: {
                    S: "defaultContent",
                },
                label: {
                    S:  "defaultLabel",
                }});
        },
        removeImageId: function(i, j) {
            this.subItems[i].imageIds.NS.splice(j, 1);
        },
        createImageId: function(i) {
            this.subItems[i].imageIds.NS.push("");
        }
    }
}
</script>
<style scoped>
.itemDiv {
    width: 100%;
    height: fit-content;
}
#editItem {
    width: 70%;
    height: fit-content;
    margin: auto;
}
.editField {
    max-height: 30%;
    width: 70%;
    font-size: 16px;
    margin-left: 5%;
    margin-right: 0%;
    float: left;
}
.editButton {
    margin-right: 15%;
    float: left;
    height: 18px;
    border-radius: 4px;

}
.subItem {
    list-style-type: none;
    padding: 0;
    margin-left: 0%;
}
.innerField {
    max-height: 30%;
    width: 87%;
    font-size: 16px;
    margin-left: 10%;
    float: left;
}
.listItem {
    list-style: none;
}
.itemEditButtons {
    float: left;
}
</style>
