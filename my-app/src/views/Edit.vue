<template>
    <div class="edit">

        <v-row justify="center" class="mb-10">
            <h1>Welcome back Makena :)</h1>
        </v-row>

        <v-tabs
          v-model="tab"
          background-color="transparent"
          color="#A15995"
          grow
          align-with-title
        >
          <v-tabs-slider color="#A15995"></v-tabs-slider>

          <v-tab
            v-for="page in pages"
            :key="page.title"
          >
            <h3>{{page.title}}</h3>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
            <v-tab-item
                v-for="page in pages"
                :key="page.title"
            >
                <v-container><component :is="page.component" /></v-container>
                
            </v-tab-item>
        </v-tabs-items>
        
        
  </div>
</template>
<script>
import InfoEdit from '../components/edit/InfoEdit';
import ImageEdit from '../components/edit/ImageEdit';

export default {
    components: {
        InfoEdit, // eslint-disable-line vue/no-unused-components
        ImageEdit, // eslint-disable-line vue/no-unused-components
    },
    data: function() {
        return {
            tab: null,
            pages: [
                {
                    title: "sections",
                    component: InfoEdit
                },
                {
                    title: "gallery",
                    component: ImageEdit
                }
            ]
        }
    }
}
</script>

<style scoped>
.edit {
    margin: 0% 10% 0% 10%
}

</style>
