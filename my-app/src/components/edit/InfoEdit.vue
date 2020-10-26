<template>
    <div id="edit-info">

        <!-- create new -->
        <v-row justify="end" class='ma-2'>
            <v-btn 
            outlined
            @click="addSection()">
                <v-icon small class="mr-2">mdi-plus</v-icon>
                Create New Section
            </v-btn>
        </v-row>

        <!--header-->
        <v-row 
        class="my-5 mx-1"
        justify="start">
            <h2>Sections ({{totalSections}})</h2>
        </v-row>

        <!--sections-->
        <InfoSections ref="sections" />

    </div>
</template>

<script>
import { CategoryProvider } from '../../providers';
import InfoSections from './infoSections';

export default {
    components: { 
        InfoSections
    },
    data: function() {
        return {
            totalSections: 0
        }
    },
    async mounted() {
        let provider = new CategoryProvider();
        this.$data.totalSections = await provider.getCategoryItems()
            .then(res => {
                return res.length
            })
            .catch(() => {
                return 0
            })
    },
    methods: {
        addSection: function() {
            this.$refs.sections.addSection()
        },
    }
}
</script>

<style scoped>

#edit-info {
    margin: 2.5% 5% 0% 5%
}

/* 
the treated tree

shallow rooted isolate trunk
sweats glistening beads from its sprinkler
green leaves in the valley
of burnt browns and drought yellows

sway in the wind of dust
cresting the natural hills
to buffet the synthetically
organic designer bark

nestled in a bed of mulch
a bed of stinky shit
dirty work to raise something successful 
in a valley that should be dead 

*/
</style>