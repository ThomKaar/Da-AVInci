<template>
     <v-card raised
        class="mx-auto"
        max-width="344"
        outlined>

    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1 title">Image Uploader</v-list-item-title>
        <v-text-field
            v-model="title"
            label="Title"
          ></v-text-field>
        
      </v-list-item-content>

      
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <form class="form">
          <input type="file" @change="onFileUpdate">
        </form>
      </v-list-item-content>
    </v-list-item>
    
    <v-list-item>
      <v-list-item-content>
        <v-card-actions>
          <v-btn v-on:click="uploadFiles" class="button">Upload</v-btn>
        </v-card-actions>
      </v-list-item-content>
    </v-list-item>
    
  </v-card>
</template>
<script>
// import vue2Dropzone from 'vue2-dropzone'
// import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import Vue from 'vue';
import FileUpload from 'v-file-upload';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { ItemProvider } from '../providers'; 
Vue.use(FileUpload);
Vue.use(vue2Dropzone);
var AWS = require('aws-sdk');
export default {
    components: {
    },
    data: function() {
        return {
          url: 'http://localhost:3000/image/upload',
          headers: {},
          filesUploaded: [],
          title: "",
        };
    },
    methods: {
      thumbUrl: function(file) {
        return file.myThumbUrlProperty
      },
      onFileUpdate: function(file) {
        this.$data.filesUploaded = file.target.files[0];
      },
      uploadFiles: function() {
        // const imageProvider = new ImageProvider();
        let file = this.$data.filesUploaded;
        let title = this.$data.title;
        AWS.config.update({
          region: "us-east-1",
          accessKeyId: "AKIAUROVSY2CUBVQDMC5", 
          secretAccessKey: "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",
        });
        var upload = new AWS.S3.ManagedUpload({
          params: {
            Bucket: 'da-vinci-image-bucket',
            Key: "stillLife/" + title + ".jpg",
            Body: file,
            ACL: "public-read"
          },
        });
        var promise = upload.promise();
        promise.then(
          function(response) {
            let itemProvider = new ItemProvider();
            itemProvider.createItem({
              title: title,
              url: response.Location,
            });
          },
          function(err) {
            return alert("There was an error uploading your photo: ", err.message); // eslint-disable-line
          }
        );   
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
  margin-left: 15%;
}
</style>
