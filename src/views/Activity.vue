<script>
    import { useMeta } from 'vue-meta'
    import Breadcumb from '../components/Breadcumb.vue'
    import ActivityCard from '../components/ActivityCard.vue'
    import ActivityTags from '../components/ActivityTags.vue'
    import ShareButton from '../components/ShareButton.vue'
    import { getItem, getList } from '../firebase'
    import Time from '../utils/time'
    export default {
        components: { Breadcumb, ActivityCard, ActivityTags, ShareButton },
        props: ['id', 'community'],
        data: function() {
            return {
                data: {},
                bulletinMeta: {},
                items: [],
            }
        },
        methods: {
            loadData: async function() {
                this.data = await getItem("articles", this.id)
                this.data.url = `https://bulletin.unilife.cc/${this.data.community}/activity/${this.data.id}`
                this.bulletinMeta = this.data.bulletinMeta
                this.data.metaAbstract = this.data.meta.abstract
                this.data.imageSrc = this.data.images.src
                this.data.tag = this.data.tags[0]
                this.bulletinMeta.date = Time(this.data.bulletinMeta.date.toDate()).format('LL')
                if (this.bulletinMeta.endDate) {
                    this.bulletinMeta.endDate = Time(this.data.bulletinMeta.endDate.toDate()).format('M月 D日')
                    this.bulletinMeta.date = `${this.bulletinMeta.date} 至 ${this.bulletinMeta.endDate}`
                }
                this.items = []
                const querySnapshot = await getList(
                    "activity", 
                    this.data.community,
                    this.data.tags[0], 
                    'bulletinMeta.popularity', 
                    3
                );
                querySnapshot.forEach((doc) => {
                    let item = doc.data()
                    item.id = doc.id
                    this.items.push(item)
                });
            },
            share: function() {
                navigator.share({
                    title: this.data.title,
                    text: this.data.meta.abstract,
                    url: this.data.meta.url,
                })
            },
            copy: function() {
                navigator.clipboard.writeText(`${this.data.title} | ${this.community.name}活動公佈欄\r\nhttps://bulletin.unilife.cc/${this.data.community}/activity/${this.data.id}`)
                alert("已複製連結")
            }
        },
        created: function() {
            this.loadData()
        },
        setup: function() {
            // const { meta } = useMeta({
            //     title: this.data ? this.data.title : content,
            //     charset: 'utf8',
            //     description: this.data ? this.data.meta.abstract : "Some description",
            //     og: {
            //         title: this.data ? this.data.title : content,
            //         description: this.data ? this.data.meta.abstract : "Some description",
            //         image: [
            //             this.data ? this.data.images.src : "",
            //         ]
            //     },
            //     twitter: {
            //         title: this.data ? this.data.title : content,
            //     },
            //     htmlAttrs: {
            //         lang: 'zh-tw',
            //         amp: true
            //     }
            // });
        },
        watch: {
            id: function() {
                this.loadData()
            }
        }
    }
</script>

<template>
    <metainfo>
        <template v-slot:title="{ content }">{{ data ? `${data.title} | ${community.name}公佈欄` : content }}</template>
    </metainfo>
    <div class="lp-archive-courses">
        <div class="banner banner-course">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6">
                        <div class="content-area">
                            <Breadcumb :middle="{'活動': `/${data.community}/activities`}" :data="data" />
                            <ActivityTags :data="data" />
                            <h2 class="banner-title">{{ data.title }}</h2>
                            <p class="course-intro">{{ data.metaAbstract }}</p>

                            <ul class="header-meta list-unstyled">
                                <li><i class="fas fa-map-marker-alt"></i>{{ bulletinMeta.zone }}</li>
                                <li><i class="fas fa-user"></i>{{ bulletinMeta.organization }} 主辦</li>
                            </ul>
                        </div>
                    </div><!-- ./col -->
                    <div class="col-lg-6">
                        <div class="feature-image">
                            <div class="thumbnail">
                                <img :src="data.imageSrc" alt="course thumbnail">
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
                    <div class="col-lg-4 order-first order-lg-last">
                        <div class="course-sidebar">
                            <div class="course-single-info course-widget">
                                <div class="course-intro">

                                    <ul>
                                        <li>
                                            <div class="row"> 
                                                <div class="col-auto flex-shrink-0"><i class="fas fa-calendar-alt"></i>日期</div>
                                                <div class="col flex-shrink-2 text-right">{{ bulletinMeta.date }}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row"> 
                                                <div class="col-auto flex-shrink-0"><i class="fas fa-map-marker-alt"></i>地點</div>
                                                <div class="col flex-shrink-2 text-right">{{ bulletinMeta.address }}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row"> 
                                                <div class="col-auto flex-shrink-0"><i class="fas fa-user"></i>主辦單位</div>
                                                <div class="col flex-shrink-2 text-right">{{ bulletinMeta.organization }}</div>
                                            </div>
                                        </li>
                                        <li>
                                            <div class="row"> 
                                                <div class="col-auto flex-shrink-0"><i class="fas fa-fire"></i>關注度</div>
                                                <div class="col flex-shrink-2 text-right">{{ bulletinMeta.popularity }}</div>
                                            </div>
                                        </li>
                                    </ul>

                                </div>

                                <div class="meta-block">
                                </div>
                                <div class="meta-block social-share">
                                    <span><h4>分享：</h4></span>
                                    <div class="row no-gutters text-center">
                                        <ShareButton type="line" class="col" :data="data" />
                                        <ShareButton type="facebook" class="col" :data="data" />
                                        <ShareButton type="copy" class="col" :data="data" />
                                        <ShareButton type="share" class="col" :data="data" />
                                    </div>
                                </div>

                                <div class="course-enroll justify-content-center">
                                    <form name="enroll-course" class="enroll-course" method="post"
                                        enctype="multipart/form-data">
                                        <input type="hidden" name="enroll-course" value="41" />
                                        <div class="row">
                                            <div class="col mb-3">
                                                <a :href="bulletinMeta.registrationLink" target="_blank">
                                                    <div class="lp-button button button-enroll-course text-center">活動網頁</div>
                                                </a>
                                            </div>
                                            <div class="col mb-3">
                                                <a :href="bulletinMeta.calendarLink" target="_blank">
                                                    <div class="lp-button button button-enroll-course text-center">加入行事曆</div>
                                                </a>
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
                            <h3 class="ts-title"> 更多熱門{{data.tag}}... </h3>
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

.social-icon {
    font-size: 2rem;
}
</style>