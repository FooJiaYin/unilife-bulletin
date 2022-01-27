<script>
    import ActivityCard from '../components/ActivityCard.vue'
    import { getContent, getList } from '../firebase'
    import Time from '../utils/time'
    export default {
        components: { ActivityCard },
        props: ['id'],
        data: function() {
            return {
                data: {},
                items: [],
            }
        },
        methods: {
            loadData: async function() {
                this.data = await getContent("activity", this.id)
                this.data.bulletinMeta.date = Time(this.data.bulletinMeta.date.toDate()).format('LL')
                this.items = []
                const querySnapshot = await getList("activity", this.data.tags[0], 'bulletinMeta.popularity', 3);
                querySnapshot.forEach((doc) => {
                    let item = doc.data()
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
    <div class="lp-archive-courses">
        <div class="banner banner-course">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <div class="content-area">
                            <div class="course-breadcumb">
                                <ol class="breadcrumb" data-wow-duration="2s">
                                    <li><router-link to="/">首頁</router-link></li> <i
                                        class="fas fa-chevron-right"></i>
                                    <li><router-link to="/activities">活動</router-link></li> <i class='fas fa-chevron-right'></i>
                                    <li class="ellipsis">{{ data.title }}</li>
                                </ol>
                            </div>
                            <div class="meta-list">
                                <router-link v-for="tag in data.tags" :to="'/activities/tag/' + tag" :key="tag">{{ tag }}</router-link>
                            </div>
                            <h2 class="banner-title">{{ data.title }}</h2>
                            <p class="course-intro">{{ data.meta.abstract }}</p>

                            <ul class="header-meta list-unstyled">
                                <li><i class="fas fa-map-marker-alt"></i>{{ data.bulletinMeta.zone }}</li>
                                <li><i class="fas fa-user"></i>{{ data.bulletinMeta.organization }} 主辦</li>
                            </ul>
                        </div>
                    </div><!-- ./col -->
                    <div class="col-lg-6">
                        <div class="feature-image">
                            <div class="thumbnail">
                                <img :src="data.images.src" alt="course thumbnail">
                            </div>
                        </div>
                    </div><!-- ./col -->
                </div><!-- ./row -->
            </div><!-- /.container -->
        </div>
        <!-- ./course-banner -->
        <section class="course-content-area">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8">
                        <div class="course-entry-content">
                            <div class="content-block">
                                <div class="content-heading">
                                    <h2 class="ts-title">活動介紹</h2>
                                </div>
                                <div id="course-overview" class="tab-pane fade in active show">
                                    <div class="overview-content">
                                        <p v-html=data.content></p>
                                    </div>
                                </div>
                            </div><!-- end content block -->
                        </div>

                    </div>
                    <div class="col-lg-4">
                        <div class="course-sidebar">
                            <div class="course-single-info course-widget">
                                <div class="course-intro">

                                    <ul>
                                        <li> <i class="fas fa-calendar-alt"></i>日期<span>{{ data.bulletinMeta.date }}</span></li>
                                        <li> <i class="fas fa-map-marker-alt"></i>地點<span class="ellipsis">{{ data.bulletinMeta.address }}</span></li>
                                        <li> <i class="fas fa-user"></i>主辦單位<span>{{ data.bulletinMeta.organization }}</span></li>
                                    </ul>

                                </div>

                                <div class="meta-block">
                                </div>
                                <div class="meta-block social-share">
                                    <h4>關注度</h4>
                                    <div
                                        class="xs_social_share_widget xs_share_url  		main_content  wslu-style-1 wslu-share-box-shaped wslu-fill-colored wslu-none wslu-share-horizontal wslu-theme-font-no wslu-main_content">
                                        <ul>
                                        </ul>
                                    </div>
                                </div>

                                <div class="course-enroll">


                                    <form name="enroll-course" class="enroll-course" method="post"
                                        enctype="multipart/form-data">
                                        <input type="hidden" name="enroll-course" value="41" />
                                        <div class="row">
                                            <div class="col">
                                                <button class="lp-button button button-enroll-course">立即報名</button>
                                            </div>
                                            <div class="col">
                                                <button class="lp-button button button-enroll-course">加入行事曆</button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        
        <div class="section-related-course">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="course-related">
                            <h3 class="ts-title"> 更多熱門{{data.tags[0]}}... </h3>
                            <div class="courselog-related-course related-course">
                                <div class="row">
                                    <div class="col-lg-4" v-for="item in items"  :key="item.id">
                                        <ActivityCard :data="item"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- ./container -->
        </div>
    </div>
</template>

<style>
#announcements {
    padding: 50px 0;
}

.overview-content h2 {
    font-size: 1.5rem;
}

.course-sidebar .course-enroll .button.lp-button {
    padding-left: 'auto' !important;
    padding-right: 'auto' !important;
}

.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
}

.meta-list > * {
    margin-right: 12px;
}
</style>