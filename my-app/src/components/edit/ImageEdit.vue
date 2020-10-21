<template>
    <div>
        <ImageUploader />
        <ImageOrganizer />
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
        return {};
    },
    methods: {}
}
</script>

<style scoped>
</style>
