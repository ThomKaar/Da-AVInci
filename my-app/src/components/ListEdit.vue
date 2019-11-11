<template>
  <div id="listEdit">
      <h1 class="title"> {{ type }} </h1>
      <ul>
          <li v-for="(heading, i) of info"
            v-bind:key="i"
            class="listItem">
            <v-text-field 
                class="editField"
                v-model="heading.category"
                :rules="nameRules"
                outlined
                >
                    <template v-slot:label>
                    Heading
                    </template>
            </v-text-field>            
            <EditItem
                v-bind:subItems="heading.items">
            </EditItem>
          </li>
      </ul>
  </div>
</template>

<script>
import EditItem from './EditItem';
import { CategoryProvider } from '../providers';
export default {
    components: {
        EditItem,
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
    }
}
</script>
<style scoped>
#listEdit {
    width: 80%;
    height: fit-content;
    margin: auto;
    background-color:azure;
}
.title {
    margin: auto;
    text-align: center;
}
.editField {
    max-height: 30%;
    width: 70%;
    font-size: 16px;
    list-style: none;
    margin: auto;
}
.listItem {
    list-style: none;
}
</style>
