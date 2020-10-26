<template>
  <v-row justify="end" class='ma-2'>
    <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
    >
      <template 
      v-slot:activator="{ on, attrs }">
          <v-btn
          outlined
          v-bind="attrs"
          v-on="on"
          >
          <v-icon small class="mr-2">mdi-upload</v-icon>
          Upload New Image
          </v-btn>
      </template>

      <v-card 
      flat
      class="mx-auto"
      outlined 
      >
        <v-card-title> Upload Image</v-card-title>

        <form class="form my-5 mx-10"> 
          <v-file-input
            accept="image/*"
            label="Choose Image File"
            prepend-icon="mdi-file-image"
            @change="onFileUpdate"
          />
          <v-text-field
            v-model="title"
            prepend-icon="mdi-pencil-outline"
            label="Image Name"
          />
        </form>

        <v-card-actions class='my-2 mx-5'>
          <v-spacer />
          <v-btn 
          outlined
          color="success"
          type="submit"
          :disabled="!isFile"
          @click.prevent="uploadFiles"
          >
            Upload
          </v-btn>
          <v-btn
          color="error"
          outlined
          @click="closeUpload"
          >
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>
import Vue from 'vue';
import FileUpload from 'v-file-upload';
import { ImageProvider, ItemProvider } from '../../providers';
Vue.use(FileUpload);

export default {
    data: function() {
        return {
          dialog: false,
          url: 'http://18.188.95.224:5000/image/upload',
          title: "",
          fileExtension: "",
          file: null,
        };
    },
    computed: {
      isFile: function() {
        return this.$data.file instanceof File
      },
    },
    methods: {
      onFileUpdate: function(file) {
        this.$data.file = file;
        this.$data.title = file.name.split('.')[0];
        this.$data.fileExtension = file.name.split('.')[1];
      },
      closeUpload: function() {
          this.$data.dialog = false;
          this.$data.file = null;
          this.$data.fileExtension = ""
          this.$data.title = ""
      },
      uploadFiles: function() {
        // emit event to reload the imageOrganizer once the image is uploaded
        // set loading until the upload is done...
        
        let file = this.$data.file;
        let title = this.$data.title;
        let contentType = `image/${this.$data.fileExtension}`;

        var reader = new FileReader();
        reader.onloadend = function(e) {
          // save this data1111 and send to server
          let data1111 = e.target.result // reader.result // ----------------- data1111
          const imageProvider = new ImageProvider();
          let body = {
            file: data1111,
            title: title,
            contentType: contentType,
          };
          imageProvider.uploadImage(body).then(function(response) {
            let itemProvider = new ItemProvider();
            itemProvider.createItem({
              title: title,
              url: response.Location,
            });
          });
        };
        reader.readAsBinaryString(file);
        this.closeUpload()
      }
    }
}
</script>

<style scoped>
</style>
