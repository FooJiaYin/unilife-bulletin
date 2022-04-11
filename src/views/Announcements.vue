<script>
    import Banner from '../components/Banner.vue'
    import AnnouncementCard from '../components/AnnouncementCard.vue'
    import { getList } from '../firebase'
    export default {
        components: { Banner, AnnouncementCard },
        props: ['community', 'tag'],
        data: function() {
            return {
                items: [],
                tags: [
                    '徵才資訊',
                    '招標公告',
                    '議員建議補助',
                    '民間團體補助',
                    '志願服務專區',
                    '公益彩券盈餘',
                    '社區照顧資源整合專區',
                ],
                order: 'publishedAt',
                limit: 15,
                page: 0
            }
        },
        methods: {
            loadData: async function() {
                this.items = []
                const querySnapshot = await getList(
                    "announcement", 
                    this.community.id, 
                    this.tag, 
                    this.order, 
                    this.limit, 
                    this.limit * this.page
                );
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
            tag: function() {
                this.loadData()
            },
            community: function() {
                this.loadData()
            }
        }
    }
</script>

<template>
    <Banner title="所有公告" />
    <div id="announcements" class="courselog-archive-events">
        <div class="container">
            <div class="row etn-event-wrapper">
                <div class="col-md-3">
                    <div class="event-search archive-widgets invisible">
                        <!-- <h3 class="widget-title archive-cat-title">Search</h3> -->
                        <form method="get" name="event-course" class="courselog-search-course-form"
                            action="https://demo.themewinter.com/wp/courselog/etn/">
                            <input type="text" name="s" class="search-event-input" placeholder="搜尋" />
                            <input type="hidden" name="post_type" value="etn" />
                            <button class="search-event-button"><i class="fas fa-search"></i></button>
                        </form>
                    </div>

                    <div class="archive-category-filter-area archive-widgets">
                        <h3 class="widget-title archive-cat-title">公告分類 <i class="fa fa-angle-down"></i></h3>
                        <div class="course-list-widget-wrap show-more-list-wrap">
                            <div class="course-list-widget-wraper show-more-wraper">
                                <ul class="course-list-widget show-more-list">
                                    <li class="first_item" :class="{ active: tag === undefined }">
                                        <router-link :to="`/${community.id}/announcements`">所有公告</router-link>
                                    </li>
                                    <li v-for="_tag in tags" :key="_tag" :class="{ active: tag === _tag}">
                                        <router-link :to="`/${community.id}/announcements/tag/${_tag}`">{{ _tag.replace("important", "重要公告") }}</router-link>
                                    </li>
                                </ul>
                                <div class="gradient_shade_area"></div>
                            </div>
                            <div class="show-more">顯示更多<i class="fas fa-arrow-down"></i></div>
                        </div>
                    </div> 
                </div>
                <div class="col-md-9">
                    <div class="course-archive-list style2">
                        <div class="row">
                            <div class="col-lg-6 align-self-center">
                                <div class="filter-item">
                                </div>
                            </div>
                            <div class="col-lg-6 text-right">
                                <div class="filter-item sort-by media justify-content-lg-end">
                                    <p>排序：</p>

                                    <div class="courselog-course-order">
                                        <select name="orderby" v-model="order">
                                            <option value="publishedAt">最新</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="course-style2">
                        <div class="row">
                            <div class="col-lg-12">
                                <AnnouncementCard v-for="item in items"  :key="item.id" :data="item" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>

</template>

<style>
#announcements {
    padding: 50px 0;
}

</style>