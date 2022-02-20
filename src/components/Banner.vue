<script>
export default {
  props: ['title', 'city'],
}
</script>

<template>
    <div class="banner-area banner-bg">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h2 class="banner-title ">
                        {{title}}
                    </h2>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .banner-area.banner-bg {
        /* background-image: url(../assets/images/banner/taipei.jpg); */
        background-image: url(http://i.imgur.com/C7uD6QY.jpg);
    }
</style>