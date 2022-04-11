<script>
    import Banner from '../components/Banner.vue'
    import ActivityCard from '../components/ActivityCard.vue'
    import { getList } from '../firebase'
    export default {
        components: { Banner, ActivityCard },
        props: ['community', 'tag'],
        data: function() {
            return {
                items: [],
                tags: [
                    '藝文活動',
                    '旅遊活動',
                    '教育活動',
                    '公益活動',
                    '運動賽事',
                    '地方活動',
                    '文化活動',
                    '生活娛樂',
                ],
                order: 'publishedAt',
                // limit: 12,
                page: 0,
                pageData: {}
            }
        },
        methods: {
            loadData: async function(page = 0) {
                this.items = []
                const querySnapshot = await getList(
                    "activity", 
                    this.community.id, 
                    this.tag, 
                    this.order, 
                    this.limit
                );
                querySnapshot.forEach((doc) => {
                    let item = doc.data()
                    item.id = doc.id
                    this.items.push(item)
                })
                this.pageData[this.page] = querySnapshot.docs
            },
            goToPage: async function(page) {
                if (page < this.page) 
                this.page = page
                this.items = []
                const querySnapshot = await getList(
                    "activity", 
                    this.community.id,
                    this.tag, 
                    this.order, 
                    this.limit, 
                    page
                );
                querySnapshot.forEach((doc) => {
                    let item = doc.data()
                    item.id = doc.id
                    this.items.push(item)
                })
                this.pageData[page] = querySnapshot.docs
            }
        },
        created: function() {
            this.loadData()
        },
        watch: {
            tag: function() {
                if (this.tag == undefined) {
                    this.$router.push(`/${this.community.id}/activities`)
                } else {
                    this.$router.push(`/${this.community.id}/activities/tag/${this.tag}`);
                }
                this.loadData()
            },
            order: function() {
                this.loadData()
            },
            page: function() {
                this.loadData()
            },
            community: function() {
                this.loadData()
            }
        }
    }
</script>

<template>
    <Banner title="所有活動" :community="community" />
    <div id="main-content" class="main-container archive-course-container archive-course-standard" role="main">
        <div class="archive-course-filter archive-course-standard mb-60">
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <div class="filter-content ts-gutter-20px">
                            <div class="ml-auto filter">
                                <i class="fas fa-sliders-h"></i>
                                分類
                            </div>
                            <div class="courselog-course-category-dropdown">
                                <select name="category" v-model="tag">
                                    <option :value="undefined"> 所有類別 </option>
                                    <option v-for="tag in tags" :key="tag" :value="tag">
                                        {{ tag }}
                                    </option>
                                </select>
                            </div>
                            <div class="ml-4 filter">
                                <i class="fas fa-sort"></i>排序
                            </div>
                            <div class="courselog-course-order">
                                <select name="orderby" v-model="order">
                                    <option value="publishedAt">最新發布</option>
                                    <option value="bulletinMeta.popularity"> 熱門活動</option>
                                    <option value="bulletinMeta.date"> 依活動日期</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="course-archive-list style1">
                <div class="row">
                    <div class="archive-course col-lg-4 col-md-6" v-for="item in items"  :key="item.id">
                        <ActivityCard :data="item"/>
                    </div>
                </div>

                <!-- <ul class="pagination justify-content-center">
                    <li><a class="page-link" v-on:click="page -= 1" v-if="page > 0">{{ page }}</a></li>
                    <li class="active"><a class="page-link">{{ page + 1 }}</a></li>
                    <li><a class="page-link" v-on:click="page += 1">{{ page + 2 }}</a></li>
                    <li><a v-on:click="page += 1"><i class="tsicon tsicon-right_arrow"></i></a></li>
                </ul> -->
            </div>
        </div>
    </div>

</template>

<style>
#announcements {
    padding: 50px 0;
}
ul.pagination {
    overflow-wrap: normal;
}
</style>