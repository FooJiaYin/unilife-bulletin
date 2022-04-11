<script>
    import AnnouncementCard from '../components/AnnouncementCard.vue'
    import { getItem, getList } from '../firebase'
    import Time from '../utils/time'
    export default {
        components: { AnnouncementCard },
        props: ['id'],
        data: function() {
            return {
                data: {},
                items: [],
            }
        },
        methods: {
            loadData: async function() {
                this.data = await getItem("articles", this.id)
                this.data.publishedAt = Time(this.data.publishedAt.toDate()).format('LL')
                this.items = []
                const querySnapshot = await getList("announcement", this.data.tags[0], "publishedAt", 3);
                querySnapshot.forEach((doc) => {
                    let item = doc.data()
                    console.log(item)
                    item.id = doc.id
                    this.items.push(item)
                });
            }
        },
        created: function() {
            this.loadData()
        },
        watch: {
            id: function() {
                this.loadData()
            }
        }
    }
</script>

<template>
    <div class="etn-event-single-wrap">
        <div class="etn-container">
            <div class="course-breadcumb">
                <ol class="breadcrumb" data-wow-duration="2s">
                    <li><router-link to="/">首頁</router-link></li> <i
                        class="fas fa-chevron-right"></i>
                    <li><router-link to="/announcements">公告</router-link></li> <i class='fas fa-chevron-right'></i>
                    <li class="ellipsis">{{ data.title }}</li>
                </ol>
            </div>
            <div class="etn-row">
                <div class="etn-col-lg-8">
                    <div class="etn-event-single-content-wrap">
                    <h2 class="mb-5">{{data.title}}</h2>
                        <div v-if="data.images && data.images.src" class="etn-single-event-media">
                            <img :src="data.images.src">
                        </div>
                        <div class="etn-event-content-body">
                            <p v-html=data.content></p>
                        </div>

                        <div class="etn-event-tag-list">
                            <h4 class="etn-tags-title">分類</h4>
                            <router-link v-for="tag in data.tags" :key="tag" :to="'/announcements/tag/' + tag">
                                {{ tag }}
                            </router-link>
                        </div>
                    </div>
                </div>

                <div class="etn-col-lg-4">
                    <div class="etn-sidebar">
                        <div class="etn-event-meta-info etn-widget">
                            <ul>
                                <li><span>發布日期：</span>{{ data.publishedAt }}</li>
                                <li><span>發布單位：</span>{{ data.bulletinMeta.organization }}</li>
                            </ul>
                        </div>
                        <!-- <div class="etn-widget etn-event-organizers">
                            <h4 class="etn-widget-title etn-title">
                                附件
                            </h4>
                            <div class="etn-organaizer-item">
                            </div>
                        </div> -->
                    </div>

                </div>

            </div>


            <div class="etn-event-related-post">
                <h3 class="related-post-title">最新公告</h3>
                <div class="etn-row">
                    <div class="etn-col-lg-4 etn-col-md-12" v-for="item in items" :key="item.id">
                        <AnnouncementCard :data="item" />
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style>
.etn-event-content-body h2 {
    font-size: 1.5rem;
}

.course-sidebar .course-enroll .button.lp-button {
    padding-left: 'auto' !important;
    padding-right: 'auto' !important;
}

.etn-event-single-wrap {
    background-color: #f7f7f7;
}

.etn-event-single-content-wrap,
.etn-event-item,
.etn-sidebar {
    background-color: #fff;
}

.etn-event-tag-list a {
    margin-right: 10px;
}

.etn-event-tag-list a:hover {
    color: #00aebb;
    border-color: #00aebb;
}

.etn-event-single-content-wrap {
    padding: 35px !important;
}

.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
}
</style>