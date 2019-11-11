<template>
  <div id="editItem">
      <form>
        <ul class="subItem">
            <li v-for="(subItem, i) of subItems"
            v-bind:key="i">
            <v-text-field 
                class="editField"
                v-model="subItem.label.S"
                :rules="nameRules"
                outlined>
                <template v-slot:label>
                    item
                </template>
            </v-text-field>
            <div v-if="subItem.imageIds">
                <ul>
                    <li v-for="i in subItem.imageIds.NS.length"
                        v-bind:key="i"
                        class="listItem">
                        <v-text-field
                        class="editField"
                        v-model="subItem.imageIds.NS[i-1]"
                        :rules="nameRules"
                        outlined>
                            <template v-slot:label>
                                image id
                            </template>
                    </v-text-field>
                    </li>
                </ul>
                <v-btn x-small class="editButton">
                    <v-icon x-small>mdi-plus-thick</v-icon>
                </v-btn>
            </div>

            <div v-if="subItem.externalUrl">
                <v-text-field
                    class="innerField"
                    v-model="subItem.externalUrl.S"
                    :rules="nameRules"
                    outlined>
                        <template v-slot:label>
                            url
                        </template>
                </v-text-field>  

                <div v-if="subItem.content && subItem.content != 'internal'">
                    <v-text-field
                        class="innerField"
                        v-model="subItem.content.S"
                        :rules="nameRules"
                        outlined>
                            <template v-slot:label>
                                content
                            </template>
                    </v-text-field>  
                </div>
            </div>
            
            <v-btn class="editButton" x-small>
                <v-icon x-small>mdi-cached</v-icon>
            </v-btn>
            <v-btn x-small class="editButton">
                <v-icon x-small>mdi-delete</v-icon>
            </v-btn>
            </li>
            <v-btn x-small class="editButton">
                <v-icon x-small>mdi-plus-thick</v-icon>
            </v-btn>
            <br>
        </ul>
      </form>
  </div>
</template>



<script>
export default {
    components: {
    },
    props: [
        'type',
        'currentHeading',
        'subItems',
    ],
    data () {
        return {
        "category": "about",
        "items":
        [
            {
                "id":
                {
                    "N": "8"
                },
                "externalUrl":
                {
                    "S": "https://www.costarastrology.com/natal-chart/1579211"
                },
                "label":
                {
                    "S": "zodiac sign"
                }
            },
            {
                "content":
                {
                    "S": "internal"
                },
                "id":
                {
                    "N": "10"
                },
                "label":
                {
                    "S": "resume"
                }
            },
            {
                "content":
                {
                    "S": "internal"
                },
                "imageIds":
                {
                    "NS":
                    [
                        "2",
                        "1"
                    ]
                },
                "id":
                {
                    "N": "9"
                },
                "label":
                {
                    "S": "info"
                }
            }
        ]
        };
    }
}
</script>
<style scoped>
#editItem {
    width: 70%;
    height: fit-content;
    margin: auto;
}
.editField {
    max-height: 30%;
    width: 70%;
    font-size: 16px;
    padding-top: 10%;
}
.editButton {
    float: left;
    margin-top: -5%;
}
.subItem {
    list-style-type: none;
    padding: 0;
    margin-left: 0%;
}
.innerField {
    max-height: 30%;
    width: 60%;
    font-size: 16px;
    margin-left: 10%;
}
.listItem {
    list-style: none;
}
</style>
