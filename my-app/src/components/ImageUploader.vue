<template>
     <v-card raised
        class="mx-auto"
        max-width="344"
        outlined>
    <form class="form">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1 title">Image Uploader</v-list-item-title>
          <v-text-field
            class="titleField"
            v-model="title"
            label="Title"
          ></v-text-field>
          
        </v-list-item-content>
      
      </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <input class="fileInput" type="file" name="file" @change="onFileUpdate">
      </v-list-item-content>
    </v-list-item>
    
    <v-list-item>
      <v-list-item-content>
        <v-card-actions>
          <v-btn 
          class="button"
          type="submit"
          v-on:click.prevent="uploadFiles"
          :loading="loading"
          >Upload</v-btn>
        </v-card-actions>
      </v-list-item-content>
    </v-list-item>

    </form>
    
  </v-card>
</template>
<script>
// import vue2Dropzone from 'vue2-dropzone'
// import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import Vue from 'vue';
import FileUpload from 'v-file-upload';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

import { ImageProvider, ItemProvider } from '../providers';
Vue.use(FileUpload);
Vue.use(vue2Dropzone);
export default {
    components: {
    },
    data: function() {
        return {
          url: 'http://localhost:3000/image/upload',
          headers: {},
          filesUploaded: [],
          title: "",
          fileExtension: "",
          loading: false,
          file: {},
        };
    },
    methods: {
      thumbUrl: function(file) {
        return file.myThumbUrlProperty
      },
      onFileUpdate: function(file) {
        this.$data.filesUploaded = file.target.files[0];
        this.$data.title = file.target.files[0].name.split('.')[0];
        this.$data.fileExtension = file.target.files[0].name.split('.')[1];
        
      },
      uploadFiles: function() {
        // this.$data.loading = true;
        // emit event to reload the imageOrganizer once the image is uploaded
        // set loading until the upload is done...
        
        let file = this.$data.filesUploaded;
        let title = this.$data.title;
        let extension = this.$data.fileExtension;
        let contentType = '';
        if (extension.includes('jpeg') || extension.includes('jpg')) {
          contentType = 'image/jpeg';
        } else if (extension.includes('png')) { 
          contentType = 'image/png';
        } else if (extension.includes('gif')) {
          contentType = 'image/gif';
        } else {
          console.log('Unkown Content Type: please use jpg, jpeg, png, or gif'); // eslint-disable-line
        }
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
      },
      mounted: function() {
        
      }
    }
}
</script>
<style scoped>
.title {
  text-align: center;
}

.button {
  text-align: center;
  margin-left: 35%;
}

.form {
  text-align: center;
}

.fileInput {
  margin-left: 15%;
}
.titleField {
  margin-left: 10%;
  margin-right: 10%;
}
</style>
