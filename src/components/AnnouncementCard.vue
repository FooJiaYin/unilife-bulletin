<script>
    import Time from '../utils/time'
    export default {
        props: ['data'],
        methods: {
            loadData: async function() {
                this.data.publishedAt = Time(this.data.publishedAt.toDate()).format('LL')
            }
        },
        created: function() {
            this.loadData()
        },
    }
</script>

<template>
    <div class="single-course">
        <div class="row align-items-center no-gutters">
            <div class="col-lg-12">
                <div class="content-area">
                    <div class="content-top">
                        <ul class="list-unstyled">
                            <li v-for="tag in data.tags" :key="tag"><i class="fas fa-tag"></i>
                                <router-link :to="'/announcements/tag/' + tag">{{ tag }}</router-link>
                            </li>
                        </ul>
                    </div>
                    <h3 class="etn-title etn-event-title">
                        <router-link :to="'/announcement/' + data.id">
                            {{ data.title }}
                        </router-link>
                    </h3>

                    <div class="author-area">
                        {{ data.meta.abstract }}
                    </div>
                    <div class="course-footer">
                        <div class="lession-and-rating">
                            <span><i class="far fa-clock"></i>{{ data.publishedAt }}</span>
                            <span><i class="fas fa-user"></i>{{ data.bulletinMeta.organization }}</span>
                        </div>
                        <div class="event-readmore">
                            <router-link :to="'/announcement/' + data.id">
                                <i class="fas fa-arrow-right"></i>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.course-footer span i {
    margin-right: 8px;
}
</style>