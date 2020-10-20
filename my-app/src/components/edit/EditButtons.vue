<template>
  <div>
    <button v-if="update" class="editButton" v-on:click="updateContent">
        <v-icon x-small>mdi-cached</v-icon>
    </button>
    <button v-if="remove" class="editButton" v-on:click="removeContent">
        <v-icon x-small>mdi-delete</v-icon>
    </button>
    <button v-if="create" class="editButton" v-on:click="createContent">
        <v-icon x-small>mdi-plus-thick</v-icon>
    </button>  
  </div>
</template>

<script>
export default {
    props: [
        'update',
        'remove',
        'create',
        'content',
        'level',
    ],
    components: {
    },
    methods: {
        updateContent: function(){
            this.$emit('updateContent', {content: this.content, level: this.level});
        },
        removeContent: function() {
            this.$emit('removeContent', {content: this.content, level: this.level});
        },
        createContent: function() {
            this.$emit('createContent');
        }
    }
}
</script>
<style scoped>
.editButton {
    margin-right: 15%;
    float: left;
    height: 18px;
    border-radius: 4px;

}
</style>
