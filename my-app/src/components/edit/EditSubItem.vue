<template>
    <div>
        <form>
            <v-text-field
                class="editField"
                v-model="fieldValue"
                outlined>
                    <template v-slot:label>
                            {{ label + " " + index}}
                    </template>
            </v-text-field>
        </form>
    </div>
</template>
<script>
export default {
    props: [
        'index',
        'value',
        'label',
    ],
    data () {
        return {
            fieldValue: this.$props.value,
        };
    }
}
</script>
<style scoped>
#editItem {
    width: 90%;
    height: fit-content;
    margin-left: 5%;
    margin-right: 0%;
}
.editField {
    max-height: 30%;
    width: 70%;
    font-size: 16px;
    margin-left: 5%;
    margin-right: 0%;
    float: left;
}
.editButton {
    float: left;
    margin-top: -5%;
}
</style>