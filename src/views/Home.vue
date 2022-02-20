<script>
    import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
    import { Swiper, SwiperSlide } from 'swiper/vue';
    import 'swiper/css';
    import 'swiper/css/autoplay';
    import 'swiper/css/pagination';
    import Banner from '../components/Banner.vue'
    import ActivityCard from '../components/ActivityCard.vue'
    import AnnouncementCard from '../components/AnnouncementCard.vue'
    import { getList } from '../firebase'
    
    export default {
        components: { Banner, ActivityCard, AnnouncementCard, Swiper, SwiperSlide }, 
        data: function() {
            return {
                activitiesFeatured: [],
                activitiesPopular: [],
                announcements: [],
            }
        },
        methods: {
            loadData: async function() {
                this.items = []
                let querySnapshot = await getList("announcement", undefined, 'publishedAt', 3);
                querySnapshot.forEach((doc) => {
                    let item = doc.data()
                    item.id = doc.id
                    this.announcements.push(item)
                });
                querySnapshot = await getList("activity", undefined, 'publishedAt', 6);
                querySnapshot.forEach((doc) => {
                    let item = doc.data()
                    console.log(item)
                    item.id = doc.id
                    this.activitiesFeatured.push(item)
                });
                querySnapshot = await getList("activity", undefined, 'bulletinMeta.popularity', 6);
                querySnapshot.forEach((doc) => {
                    let item = doc.data()
                    console.log(item)
                    item.id = doc.id
                    this.activitiesPopular.push(item)
                });
            }
        },
        created: function() {
            this.loadData()
        },
        setup() {
            const onSwiper = (swiper) => {
                console.log(swiper);
            }
            const onSlideChange = () => {
                console.log('slide change');
            }
            return {
                onSwiper,
                onSlideChange,
                modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
            }
        },
    }
</script>

<template>
    <div id="home"
        class="archive post-type-archive post-type-archive-lp_course courselog-child learnpress learnpress-page sidebar-active elementor-default elementor-kit-8">

        <Banner title="新竹縣" />

        <div id="main-content" class="main-container archive-course-container archive-course-standard" role="main">
            <div class="tranding-course-slider">
                <div class="container">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="ts-section-title text-center my-5">
                                <h2 class="section-title"> 精選活動 </h2>
                                <p class="section-subtitle"> 為您送上本月精彩活動！ </p>
                            </div>
                        </div>
                    </div>
                    <swiper
                        :modules="modules"
                        :slides-per-view="1"
                        :space-between="30"  
                        :autoplay='{
                            "delay": 1500,
                        }'
                        navigation
                        :pagination="{ clickable: true }"
                        :breakpoints="{
                            640: {
                                slidesPerView: 2,
                            },
                            1000: {
                                slidesPerView: 3,
                            }
                        }"
                        @swiper="onSwiper"
                        @slideChange="onSlideChange"
                    >
                        <swiper-slide v-for="activity in activitiesFeatured" :key="activity.id" >
                            <ActivityCard :data="activity" />
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
            <div class="tranding-course-slider">
                <div class="container">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="ts-section-title text-center my-5">
                                <h2 class="section-title"> 熱門活動 </h2>
                                <p class="section-subtitle"> 大家都在關注這些活動 </p>
                            </div>
                        </div>
                    </div>
                    <swiper
                        :modules="modules"
                        :slides-per-view="1"
                        :space-between="30"  
                        :autoplay='{
                            "delay": 1500,
                        }'
                        navigation
                        :pagination="{ clickable: true }"
                        :breakpoints="{
                            640: {
                                slidesPerView: 2,
                            },
                            1000: {
                                slidesPerView: 3,
                            }
                        }"
                        @swiper="onSwiper"
                        @slideChange="onSlideChange"
                    >
                        <swiper-slide v-for="activity in activitiesPopular" :key="activity.id" >
                            <ActivityCard :data="activity" />
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
            <div class="courselog-archive-events">
                <div class="container">
                    <div class="row etn-event-wrapper">
                        <div class="col-md-12">
                            <div class="course-style2">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="ts-section-title text-center my-5">
                                            <h2 class="section-title"> 最新公告 </h2>
                                            <p class="section-subtitle"> 為您掌握第一手消息！ </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-12">
                                        <AnnouncementCard v-for="announcement in announcements" :key="announcement.id" :data="announcement" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

        </div>
        <!--#main-content -->
    </div>
</template>

<style>
    .swiper-slide {
        margin-bottom: 40px;
    }
    .swiper-pagination-bullet-active {
        background: #00aebb;
    }
</style>