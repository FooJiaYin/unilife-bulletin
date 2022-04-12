<script>
    import Time from '../utils/time'
    import ActivityTags from '../components/ActivityTags.vue'
    export default {
        components: { ActivityTags },
        props: ['data'],
        methods: {
            loadData: async function() {
                this.data.fromNow = Time(this.data.bulletinMeta.date.toDate()).fromNow()
                this.data.bulletinMeta.date = Time(this.data.bulletinMeta.date.toDate()).format('LL')
            }
        },
        created: function() {
            this.loadData()
        },
    }
</script>

<template>
    <div class="single-course owl-item">
        <div class="single-course-wrap">
            <div class="course-thumb">
                <router-link :to="`/${data.community}/activity/${data.id}`">
                    <!-- <img class="img-fluid" src="" alt="Sample course"> -->
                    <img class="img-fluid entered" :src="data.images.src" :alt="data.title">
                </router-link>
                <ActivityTags :data="data" />
            </div>

            <div class="content-area">
                <div class="content-top">
                    <ul class="list-unstyled">
                        <li> <i class="fas fa-map-marker-alt"></i>{{ data.bulletinMeta.zone }}</li>
                        <li> <i class="fas fa-clock"></i>{{ data.fromNow }}</li>
                    </ul>
                </div>
                <h3 class="ts-course-el-title">
                    <router-link :to="`/${data.community}/activity/${data.id}`">
                        {{ data.title }}
                    </router-link>
                </h3>
                <div class="author-area">
                    <div class="instructor">
                        <i class="fas fa-calendar-alt mr-2"></i><span>{{ data.bulletinMeta.date }}</span>
                    </div>
                    <!-- <div class="instructor">
                        <a href=""><i class="fas fa-map-marker-alt mr-2"></i><span>台北市大安區平安路 23 巷 3 號</span></a>
                    </div> -->
                </div>
                <div class="course-footer">
                    <div>
                        <i class="fas fa-fire mr-2"></i><span>{{ data.bulletinMeta.popularity }}</span>
                    </div><!-- ./lesson -->
                    <div class="cl-button">
                        <router-link :to="`/${data.community}/activity/${data.id}`" class="btn-details btn-link">
                            查看更多
                            <i class="fas fa-arrow-right"></i>
                        </router-link>
                    </div>
                </div><!-- ./course-footer -->
            </div>
        </div>
    </div>
</template>