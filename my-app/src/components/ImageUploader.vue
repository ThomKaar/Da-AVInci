<template>
     <v-card raised
        class="mx-auto"
        max-width="344"
        outlined>
    <form class="form" action="http://localhost:3000/image/upload" method="POST" >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="headline mb-1 title">Image Uploader</v-list-item-title>
          <input
              name="title"
              v-model="title"
              label="Title"
            >
          
        </v-list-item-content>
      
      </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <input  type="file" name="file" @change="onFileUpdate">
      </v-list-item-content>
    </v-list-item>
    
    <v-list-item>
      <v-list-item-content>
        <v-card-actions>
          <v-btn 
          class="button"
          type="submit"
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
// import { ItemProvider } from '../providers'; 
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
          fileExtension: "",
          loading: false,
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
        // const imageProvider = new ImageProvider();
        let file = this.$data.filesUploaded;
        // let title = this.$data.title;
        // let extension = this.$data.fileExtension;
        // let contentType = '';
        // if (extension.includes('jpeg') || extension.includes('jpg')) {
        //   contentType = 'image/jpeg';
        // } else if (extension.includes('png')) { 
        //   contentType = 'image/png';
        // } else if (extension.includes('gif')) {
        //   contentType = 'image/gif';
        // } else {
        //   console.log('Unkown Content Type: please use jpg, jpeg, png, or gif'); // eslint-disable-line
        // }
        AWS.config.update({
          region: "us-east-1",
          accessKeyId: "AKIAUROVSY2CUBVQDMC5",
          secretAccessKey: "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",
        });
        console.log(file); // eslint-disable-line
        // var upload = new AWS.S3.ManagedUpload({
        //   params: {
        //     Bucket: 'da-vinci-image-bucket',
        //     Key: "stillLife/" + title + "." + extension,
        //     Body: file,
        //     ACL: "public-read",
        //     ContentType: contentType,
        //   },
        // });
        // var promise = upload.promise();
        // this.$data.loading = false;
        // promise.then(
        //   function(response) {
        //     let itemProvider = new ItemProvider();
        //     itemProvider.createItem({
        //       title: title,
        //       url: response.Location,
        //     });
        //   },
        //   function(err) {
        //     return alert("There was an error uploading your photo: ", err.message); // eslint-disable-line
        //   }
        // );
        // this.$emit('updateContent', {content: this.content, level: this.level});   
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
