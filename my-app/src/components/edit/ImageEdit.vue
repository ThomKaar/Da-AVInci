<template>
    <div>
        <ImageOrganizer class="topLevelCard">
        </ImageOrganizer>
        <ImageUploader class="topLevelCard">
        </ImageUploader>
    </div>
</template>
<script>
import ImageOrganizer from './ImageOrganizer';
import ImageUploader from './ImageUploader';
export default {
    components: {
        ImageOrganizer,
        ImageUploader,
    },
    data: function() {
        return {

        };
    },
    methods: {
    }
}
</script>
<style scoped>
.topLevelCard {
    margin-top: 5%;
}
</style>
