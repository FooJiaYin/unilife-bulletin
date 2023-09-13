<script>
import { getItem } from '../firebase'
import Navbar from '../components/Navbar.vue'
import { useMeta } from 'vue-meta'

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
    setup: function() {
        useMeta({
            title: '首頁',
            charset: 'utf8',
            description: 'The Description',
            og: {
                title: '首頁',
                description: 'Bla bla',
                image: [
                'https://firebasestorage.googleapis.com/v0/b/gleaming-bot-319115.appspot.com/o/communities%2FhualienCounty%2FbackgroundImage%2FDSC_0200.jpg?alt=media&token=fa2cc5be-29a1-4e51-b595-df88798ea5b0',
                ]
            },
            twitter: {
                title: '首頁'
            },
            htmlAttrs: {
                lang: 'zh-tw',
                amp: true
            }
        })
    }
}
</script>

<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ content ? `${content} | ${community.name}活動公佈欄` : `${community.name}活動公佈欄` }}</template>
    </metainfo>
    <Navbar :community="community" />
    <router-view :community="community" />
</template>