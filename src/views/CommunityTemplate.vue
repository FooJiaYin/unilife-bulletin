<script>
import { getItem } from '../firebase'
import Navbar from '../components/Navbar.vue'

export default {
    components: { Navbar }, 
    props: ['communityId'],
    data: function() {
        return {
            community: {},
        }
    },
    methods: {
        loadData: async function() {
            this.community = await getItem('communities', this.communityId)
        },
    },
    created: function() {
        this.loadData()
    },
    watch: {
        communityId: function() {
            this.loadData()
        }
    },
}
</script>

<template>
    <Navbar :community="community" />
    <router-view :community="community" />
</template>