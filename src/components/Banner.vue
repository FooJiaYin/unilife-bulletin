<script>
export default {
  props: ['title', 'community'],
}
</script>

<template>
    <div class="banner-area banner-bg" :style="{backgroundImage: 'url('+ community.backgroundImage +')'}">
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